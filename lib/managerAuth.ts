import crypto from "crypto";

export const managerSessionCookieName = "yenth_manager_session";

type ManagerSession = {
  exp: number;
  username: string;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getManagerSecret() {
  return process.env.MANAGER_AUTH_SECRET || process.env.MANAGER_ADMIN_PASSWORD || "";
}

function signPayload(payload: string) {
  const secret = getManagerSecret();

  if (!secret) {
    return "";
  }

  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function isManagerAuthConfigured() {
  return Boolean(process.env.MANAGER_ADMIN_USERNAME && process.env.MANAGER_ADMIN_PASSWORD && getManagerSecret());
}

export function isValidManagerCredential(username: string, password: string) {
  const expectedUsername = process.env.MANAGER_ADMIN_USERNAME;
  const expectedPassword = process.env.MANAGER_ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return false;
  }

  return username === expectedUsername && password === expectedPassword;
}

export function createManagerSessionToken(username: string) {
  const payload = base64UrlEncode(
    JSON.stringify({
      exp: Date.now() + 1000 * 60 * 60 * 8,
      username,
    } satisfies ManagerSession),
  );
  const signature = signPayload(payload);

  if (!signature) {
    return "";
  }

  return `${payload}.${signature}`;
}

export function verifyManagerSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  if (!expectedSignature || signature !== expectedSignature) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as Partial<ManagerSession>;

    if (!session.username || !session.exp || session.exp < Date.now()) {
      return null;
    }

    return {
      username: session.username,
    };
  } catch {
    return null;
  }
}

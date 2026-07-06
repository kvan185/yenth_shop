import { cookies } from "next/headers";
import {
  isManagerAuthConfigured,
  managerSessionCookieName,
  verifyManagerSessionToken,
} from "../../lib/managerAuth";
import ManagerLoginClient from "./ManagerLoginClient";
import ManagerPageClient from "./ManagerPageClient";

export const metadata = {
  title: "Manager | YENTH",
  description: "Quản lý tài nguyên học tập và kết nối Supabase của YENTH.",
};

export default async function ManagerPage() {
  const cookieStore = await cookies();
  const session = verifyManagerSessionToken(cookieStore.get(managerSessionCookieName)?.value);

  if (!session) {
    return <ManagerLoginClient authConfigured={isManagerAuthConfigured()} />;
  }

  return <ManagerPageClient managerUser={session.username} />;
}

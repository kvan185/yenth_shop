import { NextResponse } from 'next/server';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

type Lead = {
  name?: string;
  contact?: string;
  need?: string;
  birthDate?: string;
  createdAt: string;
};

const dataFile = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<Lead[]> {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8')) as Lead[];
  } catch {
    return [];
  }
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<Lead, 'createdAt'>;
  const lead: Lead = { ...body, createdAt: new Date().toISOString() };
  const leads = [lead, ...(await readLeads())].slice(0, 200);

  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, JSON.stringify(leads, null, 2), 'utf8');

  return NextResponse.json({ ok: true, lead });
}

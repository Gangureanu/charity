import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getContent, saveContent, SiteContent } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as SiteContent;
  saveContent(body);
  return NextResponse.json(body);
}

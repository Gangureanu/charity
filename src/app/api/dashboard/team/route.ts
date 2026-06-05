import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getTeam, saveTeam, TeamMember } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getTeam());
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as Omit<TeamMember, "id">;
  const team = getTeam();
  const newMember: TeamMember = { ...body, id: Date.now().toString() };
  team.push(newMember);
  saveTeam(team);
  return NextResponse.json(newMember, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as TeamMember;
  const team = getTeam();
  const index = team.findIndex((m) => m.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  team[index] = body;
  saveTeam(team);
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const team = getTeam().filter((m) => m.id !== id);
  saveTeam(team);
  return NextResponse.json({ success: true });
}

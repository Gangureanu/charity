import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getEvents, saveEvents, Event } from "@/lib/data";

export async function GET() {
  const events = getEvents();
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as Omit<Event, "id">;
  const events = getEvents();
  const newEvent: Event = {
    ...body,
    id: Date.now().toString(),
  };
  events.push(newEvent);
  saveEvents(events);
  return NextResponse.json(newEvent, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as Event;
  const events = getEvents();
  const index = events.findIndex((e) => e.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  events[index] = body;
  saveEvents(events);
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const events = getEvents().filter((e) => e.id !== id);
  saveEvents(events);
  return NextResponse.json({ success: true });
}

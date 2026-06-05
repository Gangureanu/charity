import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON(filename: string, data: unknown): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export interface Event {
  id: string;
  title_ro: string;
  title_ru: string;
  date: string;
  location_ro: string;
  location_ru: string;
  description_ro: string;
  description_ru: string;
  image: string;
  free: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role_ro: string;
  role_ru: string;
  bio_ro: string;
  bio_ru: string;
  image: string;
}

export interface SiteContent {
  site: {
    name: string;
    tagline_ro: string;
    tagline_ru: string;
    phone: string;
    email: string;
    address_ro: string;
    address_ru: string;
    facebook: string;
    instagram: string;
    map_embed: string;
  };
  stats: {
    children: string;
    families: string;
    years: string;
    specialists: string;
  };
  milestones: Array<{
    year: string;
    title_ro: string;
    title_ru: string;
    text_ro: string;
    text_ru: string;
  }>;
}

export function getEvents(): Event[] {
  return readJSON<{ events: Event[] }>("events.json").events;
}

export function getEvent(id: string): Event | undefined {
  return getEvents().find((e) => e.id === id);
}

export function saveEvents(events: Event[]): void {
  writeJSON("events.json", { events });
}

export function getTeam(): TeamMember[] {
  return readJSON<{ team: TeamMember[] }>("team.json").team;
}

export function saveTeam(team: TeamMember[]): void {
  writeJSON("team.json", { team });
}

export function getContent(): SiteContent {
  return readJSON<SiteContent>("content.json");
}

export function saveContent(content: SiteContent): void {
  writeJSON("content.json", content);
}

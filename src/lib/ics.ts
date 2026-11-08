import type { Milestone } from "./types";
import { addDays } from "./dates";

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** Calendari .ics amb avisos (7 dies abans dels exàmens, 2 dies abans de la resta). */
export function buildIcs(items: Milestone[], stamp = "20261108T000000Z"): string {
  const ev = items.map((m, i) => [
    "BEGIN:VEVENT",
    `UID:parla-c1-${i}-${m.date}@parla-c1`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${m.date.replace(/-/g, "")}`,
    `DTEND;VALUE=DATE:${addDays(m.date, 1).replace(/-/g, "")}`,
    `SUMMARY:${esc("C1 català · " + m.title)}`,
    `DESCRIPTION:${esc(m.detail)}`,
    "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(m.title)}`,
    `TRIGGER:-P${m.kind === "exam" ? 7 : 2}D`, "END:VALARM",
    "END:VEVENT"
  ].join("\r\n"));
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Parla C1//CA", "CALSCALE:GREGORIAN", ...ev, "END:VCALENDAR"].join("\r\n");
}

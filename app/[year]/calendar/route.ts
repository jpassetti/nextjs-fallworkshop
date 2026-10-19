import { getWorkshopEvent, VENUE, ADDRESS } from "@/lib/workshopEvent";
import { SITE_URL } from "@/lib/seo";

export async function GET(_request: Request, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const event = getWorkshopEvent(year);
  if (!event) return new Response("Workshop not found", { status: 404 });
  // RFC 5545: all-day end dates are exclusive; keep the final workshop day included.
  const exclusiveEnd = new Date(`${event.endDate}T00:00:00Z`);
  exclusiveEnd.setUTCDate(exclusiveEnd.getUTCDate() + 1);
  const compactDate = (date: string) => date.replace(/-/g, "");
  const escape = (text: string) => text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Alexia Fall Workshop//Workshop Calendar//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT", `UID:alexia-workshop-${year}@fallworkshop.newhouse.syr.edu`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;VALUE=DATE:${compactDate(event.startDate)}`,
    `DTEND;VALUE=DATE:${compactDate(exclusiveEnd.toISOString().slice(0, 10))}`,
    `SUMMARY:${year} The Alexia Fall Workshop`,
    `LOCATION:${escape(`${VENUE}, ${ADDRESS}`)}`,
    `DESCRIPTION:${escape("Private workshop for participating students only. Not open to the public. Session times are in America/New_York; consult the online schedule for rooms and times.")}`,
    `URL:${SITE_URL}/${year}`, "CLASS:PRIVATE", "TRANSP:TRANSPARENT", "END:VEVENT", "END:VCALENDAR",
  ];
  // Fold by UTF-8 byte length, including the continuation space.
  const folded = lines.map((line) => {
    const parts: string[] = [];
    let part = "";
    for (const char of line) {
      if (new TextEncoder().encode(part + char).length > 75) { parts.push(part); part = " "; }
      part += char;
    }
    parts.push(part);
    return parts.join("\r\n");
  });
  return new Response(`${folded.join("\r\n")}\r\n`, { headers: {
    "Content-Type": "text/calendar; charset=utf-8",
    "Content-Disposition": `attachment; filename="alexia-fall-workshop-${year}.ics"`,
    "X-Robots-Tag": "noindex",
  } });
}

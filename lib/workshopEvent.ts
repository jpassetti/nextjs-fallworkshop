import WORKSHOP_DATES from "@/lib/workshopDates";

export const VENUE = "Newhouse School, Syracuse University";
export const ADDRESS = "215 University Place, Syracuse, NY 13244";
export const getWorkshopEvent = (year: string) => WORKSHOP_DATES.find((event) => event.year === year);


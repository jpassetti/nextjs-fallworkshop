// Workshop dates lookup
// Usage: getWorkshopDates(year)

const WORKSHOP_DATES = [
  { year: "2026", startDate: "2026-10-22", endDate: "2026-10-25", dates: "Thursday, Oct. 22-Sunday, Oct. 25, 2026" },
  { year: "2025", startDate: "2025-10-23", endDate: "2025-10-26", dates: "Thursday, Oct. 23-Sunday, Oct. 26, 2025" },
  { year: "2024", startDate: "2024-10-17", endDate: "2024-10-20", dates: "Thursday, Oct. 17-Sunday, Oct. 20, 2024" },
  { year: "2023", startDate: "2023-10-12", endDate: "2023-10-15", dates: "Thursday, Oct. 12-Sunday, Oct. 15, 2023" },
  { year: "2022", startDate: "2022-10-20", endDate: "2022-10-23", dates: "Thursday, Oct. 20-Sunday, Oct. 23, 2022" }
];

export function getWorkshopDates(year) {
  if (!year) {
    // If no year provided, return the latest year
    return WORKSHOP_DATES[0].dates;
  }
  const found = WORKSHOP_DATES.find(item => item.year === year);
  return found ? found.dates : null;
}

export default WORKSHOP_DATES;

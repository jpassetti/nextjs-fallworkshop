// Workshop dates lookup
// Usage: getWorkshopDates(year)

const WORKSHOP_DATES = [
  { year: "2025", dates: "Oct. 23–26, 2025" },
  { year: "2024", dates: "Oct. 17-20, 2024" },
  { year: "2023", dates: "Oct. 12-15, 2023" },
  { year: "2022", dates: "Oct. 20-23, 2022" }
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

"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import WORKSHOP_DATES from "@/lib/workshopDates";
import styles from "./header-utilities.module.scss";

type HeaderUtilitiesProps = {
  currentYear?: string;
  tone?: "default" | "inverse";
  idPrefix?: string;
  compact?: boolean;
};

const HeaderUtilities = ({
  currentYear,
  tone = "default",
  idPrefix = "story-search",
  compact = false,
}: HeaderUtilitiesProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear || "2026");
  const years = useMemo(() => WORKSHOP_DATES.map((item) => item.year), []);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    router.push(`/${year}`);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    const targetYear = selectedYear || currentYear || years[0];
    if (!targetYear) return;

    const href = trimmed
      ? `/${targetYear}/stories?q=${encodeURIComponent(trimmed)}`
      : `/${targetYear}/stories`;
    router.push(href);
  };

  return (
    <div
      className={`${styles.utilities} ${
        tone === "inverse" ? styles.utilitiesInverse : ""
      } ${compact ? styles.utilitiesCompact : ""}`}
    >
      <label className={styles.label}>
        <span>Year</span>
        <select
          className={styles.select}
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          aria-label="Choose workshop year"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <form className={styles.search} onSubmit={handleSearch}>
        <label htmlFor={idPrefix} className={styles.label}>
          <span>Search stories</span>
          <input
            id={idPrefix}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories"
          />
        </label>
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
};

export default HeaderUtilities;

import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const redirectYear = process.env.HOME_REDIRECT_TO_YEAR ?? "2026";
  redirect(`/${redirectYear}`);
}

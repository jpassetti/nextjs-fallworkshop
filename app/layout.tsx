import type { Metadata } from "next";
import "@/styles/global.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://fallworkshop.newhouse.syr.edu"),
  title: "The Alexia Fall Workshop | Newhouse School at Syracuse University",
  description:
    "Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join Newhouse professors and students in visual storytelling.",
  keywords: [
    "photojournalism",
    "photography",
    "multimedia storytelling",
    "visual advocacy",
    "storytelling",
  ],
  openGraph: {
    title: "The Alexia Fall Workshop | Newhouse School at Syracuse University",
    description:
      "Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join Newhouse professors and students in visual storytelling.",
    url: "https://fallworkshop.newhouse.syr.edu",
    siteName: "The Alexia Fall Workshop",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/the-alexia-fall-workshop-1200x630px.jpg",
        width: 1200,
        height: 630,
        alt: "The Alexia Fall Workshop and the Newhouse School at Syracuse University wordmarks.",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@thefallworkshop",
    title: "The Alexia Fall Workshop | Newhouse School at Syracuse University",
    description:
      "Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join Newhouse professors and students in visual storytelling.",
    images: ["/images/the-alexia-fall-workshop-1200x630px.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

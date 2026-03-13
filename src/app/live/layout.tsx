import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Session | Virtual Sanctuary",
  description: "Join our live yoga sessions at Yoga@Infinity. Experience Hatha, Strength Yoga, and Women Wellness from the comfort of your home.",
  alternates: {
    canonical: "https://yogaatinfinity.com/live",
  },
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

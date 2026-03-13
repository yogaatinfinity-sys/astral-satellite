import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check-in | Yoga@Infinity",
  description: "Digital check-in for Yoga@Infinity sessions.",
  alternates: {
    canonical: "https://yogaatinfinity.com/check-in",
  },
};

export default function CheckInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

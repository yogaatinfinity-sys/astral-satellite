import * as React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="currentColor"
                className="w-full h-full"
            >
                <path d="M50 5C50 5 30 35 30 65C30 85 50 95 50 95C50 95 70 85 70 65C70 35 50 5 50 5Z" />
                <path d="M30 65C15 63 5 70 5 80C5 80 35 90 50 95C35 90 25 80 30 65Z" />
                <path d="M70 65C85 63 95 70 95 80C95 80 65 90 50 95C65 90 75 80 70 65Z" />
                <path d="M22 45C10 45 2 55 2 65C2 65 20 75 30 65C20 75 12 65 22 45Z" />
                <path d="M78 45C90 45 98 55 98 65C98 65 80 75 70 65C80 75 88 65 78 45Z" />
            </svg>
            <span className="mt-1 text-sm font-bold tracking-widest uppercase origin-center transform text-current">
                Yoga@Infinity
            </span>
        </div>
    );
}

"use client"

import Script from "next/script"

export function ReviewWidget() {
    return (
        <div className="w-full max-w-5xl mx-auto py-8">
            {/* Elfsight Google Reviews Widget Script */}
            <Script
                src="https://elfsightcdn.com/platform.js"
                strategy="afterInteractive"
            />
            {/* Widget Container */}
            <div
                className="elfsight-app-3c281f12-4ede-453f-837e-c560d5857648 w-full"
                data-elfsight-app-lazy
            />
        </div>
    )
}

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-soft-bone p-4 text-center">
            <h2 className="text-3xl font-serif text-charcoal mb-4">Something went wrong!</h2>
            <p className="text-charcoal/60 mb-8 max-w-md">
                A client-side exception occurred. This might be due to a hydration mismatch or a 3D rendering issue.
            </p>
            <div className="bg-white/50 p-4 rounded-xl mb-8 text-left max-w-2xl overflow-auto border border-charcoal/10">
                <p className="font-mono text-sm text-red-600 font-bold whitespace-pre-wrap">
                    {error.message || "Unknown Error"}
                </p>
                {error.digest && (
                    <p className="font-mono text-xs text-charcoal/40 mt-2">
                        Digest: {error.digest}
                    </p>
                )}
            </div>
            <Button
                onClick={() => reset()}
                className="bg-brand-primary text-white rounded-full px-8 py-3"
            >
                Try again
            </Button>
        </div>
    )
}

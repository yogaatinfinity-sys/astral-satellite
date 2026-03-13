import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Yoga@Infinity',
        short_name: 'Yoga@Infinity',
        description: 'Elevate your practice with Sharmila at Yoga @ Infinity. Join our 9:00 AM - 11:00 AM sessions in Oragadam, specializing in Hatha, Strength Yoga, and Women Wellness for peak performance.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d9488',
        icons: [
            {
                src: '/icon-v2.png',
                sizes: '144x144',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-v2.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    }
}

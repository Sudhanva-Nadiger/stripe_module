import { z } from "zod"

export function absoluteUrl(path: string) {
    if (typeof window !== 'undefined') return path
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}${path}`
    return `http://localhost:${process.env.PORT ?? 3000
        }${path}`
}

export const sessionInputValidator = z.object({
    priceId: z.string().min(1, {
        message: 'Priceid required',
    }),
})


export const stripeProcessPaymentValidator = z.object({
    session_id: z.string().min(1, {
        message: 'Session id required',
    }),
})
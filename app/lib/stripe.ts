import Stripe from 'stripe'
import { DB_URL } from './constants'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
    typescript: true
})

export async function getUserSubscriptionPlan(userId: string) {
    const response = await fetch(`${DB_URL}/${userId}`)
    const user = await response.json()

    if (!user) {
        return false;
    }

    const isSubscribed = Boolean(
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd && // 86400000 = 1 day
        user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    )

    return isSubscribed
}
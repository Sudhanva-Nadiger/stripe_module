type SubscriptionDetail = {
    userId: string
    stripeSubscriptionId: string
    stripeCustomerId: string
    stripePriceId: string,
    stripeCurrentPeriodEnd: Date,
}

export const subscriptionDetails: SubscriptionDetail[] = []
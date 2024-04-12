import { subscriptionDetails } from "@/app/lib/db"
import { stripe } from "@/app/lib/stripe"
import { stripeProcessPaymentValidator } from "@/app/lib/util"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()

    const { session_id } = stripeProcessPaymentValidator.parse(body)
    const session = await stripe.checkout.sessions.retrieve(session_id)

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

    if(session.status === 'complete') {
        // dbcall to save this detail
        const index = subscriptionDetails.findIndex(sub => sub.userId === session.metadata?.userId)
        if(index !== -1) {
            subscriptionDetails[index].stripePriceId = subscription.items.data[0].id
            subscriptionDetails[index].stripeCurrentPeriodEnd = new Date(subscription.current_period_end * 1000)
        } else {
            subscriptionDetails.push({
                userId: session.metadata?.userId as string,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
            })
        }
    }

    console.log(subscriptionDetails);
    

    return NextResponse.json({
        status: session.status
    })
}
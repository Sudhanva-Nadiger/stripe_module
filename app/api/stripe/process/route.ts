import { stripe } from "@/app/lib/stripe"
import { stripeProcessPaymentValidator } from "@/app/lib/util"
import { NextResponse } from "next/server"
import { DB_URL } from "@/app/lib/constants"
 
export async function POST(request: Request) {
    const body = await request.json()

    const { session_id } = stripeProcessPaymentValidator.parse(body)
    const session = await stripe.checkout.sessions.retrieve(session_id)

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

    if(session.status === 'complete') {
        // dbcall to save this detail
        const userId = session.metadata?.userId
        if(!userId) {
            return NextResponse.json({}, {status: 200})
        }

        console.log("somethin happeening");
        

        const response = await fetch(`${DB_URL}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let dbSubscriptionDetail = null

        if(response.status === 200) {
            dbSubscriptionDetail = await response.json()
        }

        console.log("somethin happend");
        

        if(!dbSubscriptionDetail) {
            await fetch(DB_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                    userId: userId,
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: session.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
                })
            })
        } else {
            await fetch(`${DB_URL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userId,
                    userId: userId,
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: session.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
                })
            })
        }
    }
    

    return NextResponse.json({
        status: session.status
    })
}
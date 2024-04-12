import { stripe } from "@/app/lib/stripe";
import { sessionInputValidator } from "@/app/lib/util";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { priceId } = sessionInputValidator.parse(await request.json())

        
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            return_url: `${request.headers.get('origin')}/embeded_checkout/return?session_id={CHECKOUT_SESSION_ID}`,
            metadata:{
                userId: 'Sudhanva_Nadiger'
            }
        })


        return NextResponse.json({
            id: session.id,
            clientSecret: session.client_secret
        })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
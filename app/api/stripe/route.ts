import { stripe } from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json() as {
        amount: number,
        currency: string,
        payment_method_types: string[]
    };

    const paymentIntent = await stripe.paymentIntents.create({
        amount: body.amount * 100,
        currency: body.currency || 'usd',
        payment_method_types: body.payment_method_types || ['card'],
        description: 'Test payment',
        shipping: {
            address: {
                city: 'New York',
                country: 'US',
                line1: '1234 Main Street',
                postal_code: '10001',
                state: 'NY',
            },
            name: 'John Doe',
        },

    })

return NextResponse.json({
    ClientSecret: paymentIntent.client_secret
})
}
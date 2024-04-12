import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useCustomStripe() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const [sessionId, setSessionId] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>('');

    useEffect(() => {
        (async function() {
            const respose = await fetch('/api/stripe/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
                })
            })

            const sessionData = await respose.json();
            setSessionId(sessionData.id);
            setClientSecret(sessionData.clientSecret);
        })()
    }, [])

    return { 
        stripePromise,
        sessionId,
        clientSecret
    };
}
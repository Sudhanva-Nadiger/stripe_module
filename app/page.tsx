'use client'

import { Stripe, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { absoluteUrl } from "./lib/util";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function Home() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(new Promise(() => null));
  const [clientSecret, setClientSecret] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async function () {
      const response = await fetch(absoluteUrl('/api/stripe'), {
        method: 'POST',
        body: JSON.stringify({
          amount: 5,
          currency: 'usd',
          payment_method_types: ['card']
        })
      })

      const { ClientSecret } = await response.json();

      setClientSecret(ClientSecret)

      const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      setStripePromise(stripePromise)
    }())
    setLoading(false);
  }, [])

  if(loading) return <div>Loading...</div>

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1>Welcome to payment</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

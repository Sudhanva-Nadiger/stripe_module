'use client'

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import React from 'react'
import { useCustomStripe } from '../hooks/useCustomStripe'

type Props = {}

const EmbedCheckoutForm = (props: Props) => {
    const {
        stripePromise,
        clientSecret
    } = useCustomStripe()

    return (
        <div>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: clientSecret }}>
                <EmbeddedCheckout className="h-full" />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default EmbedCheckoutForm
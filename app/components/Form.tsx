'use client'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

type Props = {}

const Form = (props: Props) => {
    const stripe = useStripe();
    const elements = useElements();

    return (
        <form>
            <PaymentElement />
            <button>Pay</button>
        </form>
    )
}

export default Form
'use client'

import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutForm = () => {
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [message, setMessage] = useState<string | undefined>('')

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!stripe || !elements) return

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
            redirect: 'if_required',
        })

        if(error) {
            setMessage(error.message)
        } else if(paymentIntent.status === 'succeeded') {
            setMessage('Payment successful 🎉, Redirectiong to completion page')
            // now we can store this in our db (since it is one time payment we can simply store the userid and payment intent id in our db)
            router.push('/completion')
        } else {
            setMessage('Payment failed')
        }

        setIsProcessing(false)
    }

    return (
        <form onSubmit={handleSubmit} className="border p-4 shadow rounded-md min-w-[320px]">
            <PaymentElement
                options={{
                    fields: {
                        billingDetails: {

                        }
                    } 
                }} 
            />
            <AddressElement 
                options={{
                    mode: 'billing', 
                    fields: {phone: "always"}, 
                    validation: { phone: { required : "always"}}
                }}
            />
            <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-blue-500 my-2 p-2 flex justify-center rounded-md text-white hover:bg-blue-500 hover:bg-opacity-90"
            >
                {isProcessing ? <Loader className={'w-4 h-4 animate-spin'} /> : 'Pay'}
            </button>

            { message && <p className="text-red-500">{message}</p> }
        </form>
    )
}

export default CheckoutForm
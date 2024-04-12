'use client'

import { useState } from "react"
import EmbedCheckoutForm from "../components/EmbedCheckoutForm"


const EmbededCheckout = () => {
    const [showCheckout, setShowCheckout] = useState<boolean>(false)
  
    return (
        <div className='w-full h-screen'>
            <div className="w-full h-full flex flex-col-reverse sm:flex-row items-center justify-around mt-2">
                <div className={`flex flex-col justify-start ${showCheckout ? 'flex-[1]': 'mt-12'} h-full`}>
                    <h1 className="text-center text-lg">Your total amount it $5</h1>
                    <button
                        className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-opacity-90 m-2"
                        onClick={() => setShowCheckout(true)}
                    >
                        Checkout
                    </button>
                </div>

                {
                    showCheckout && (
                        <div className="border p-1 shadow overflow-scroll h-screen rounded-sm flex-[3]">
                            <EmbedCheckoutForm />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EmbededCheckout
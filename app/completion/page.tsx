import React from 'react'

type Props = {}

const CompletionPage = (props: Props) => {
  return (
    <div className='w-full h-screen'>
        <div className='flex flex-col items-center justify-center w-full h-full rounded-md shadow border'>
            <div className='bg-green-100 rounded-md p-4 text-green-500'>
                <h1 className='text-2xl font-bold'>Payment Successful</h1>
                <p className='text-lg'>Your payment has been processed successfully</p>
            </div>
        </div>
    </div>
  )
}

export default CompletionPage
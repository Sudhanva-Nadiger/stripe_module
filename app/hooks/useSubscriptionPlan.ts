import { useEffect, useState } from "react"
import { getUserSubscriptionPlan } from "../lib/stripe"

export function useSubscriptionPlan(userId: string) {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

    useEffect(() => {
        (async function() {
            const isSubscribed = await getUserSubscriptionPlan(userId)
            setIsSubscribed(isSubscribed)
        })()
    }, [])

    return { 
        isSubscribed
     }
}
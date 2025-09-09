import { useEffect, useState } from "react";

export function useDebounce<T>(value: string, delay: number): T {
    const [debounceValue, setDebounceValue] = useState<T>(value as unknown as T);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value as unknown as T)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])   

    return debounceValue
}
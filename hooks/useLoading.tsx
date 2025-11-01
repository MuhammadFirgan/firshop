'use client'

import { useState } from "react"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import { FormEventHandler } from "react" 

export default function useLoading<TFieldValues extends FieldValues>(
    handleSubmit: UseFormHandleSubmit<TFieldValues>,
): {
    isLoading: boolean;
    handleLoading: (onSubmit: (data: TFieldValues) => Promise<void>) => FormEventHandler<HTMLFormElement>;
} {

    const [ isLoading, setIsLoading ] = useState(false)
    
   
    const handleLoading = (onSubmit: (data: TFieldValues) => Promise<void>) => {
        
        const loadingWrappedSubmit = async (data: TFieldValues) => {
            setIsLoading(true)
            try {
                await onSubmit(data)
            } catch (error) {
                console.error("Error during form submission:", error)
            } finally {
                setIsLoading(false)
            }
        }
        
        
        return handleSubmit(loadingWrappedSubmit)
    }

    return { isLoading, handleLoading }
}
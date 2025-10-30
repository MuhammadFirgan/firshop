'use client'

import { categorySchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form } from "../ui/form"
import CustomForm, { FieldType } from "./CustomForm_"
import { Button } from "../ui/button"
import { Loader2, ScanBarcode } from "lucide-react"
import { useEffect, useState } from "react"
import { generateSlug } from "@/lib/utils"
import { createCategory } from "@/lib/action/category.action"
import { useRouter } from "next/navigation"


export default function FormCategory() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const nameValue = form.watch('name')
    const slugValue = form.watch('slug')
   
    useEffect(() => {
        if (nameValue) {
            const newSlug = generateSlug(nameValue); 
            form.setValue('slug', newSlug);
        } else {
            form.setValue('slug', '');
        }
    }, [nameValue, form])

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        setIsLoading(true)
        try {
            const newCategory = await createCategory({...values})
            if(newCategory?.errors) {
                console.log(newCategory?.errors)
            }
            router.push('/dashboard/categories')
            
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <CustomForm  
                            control={form.control}
                            type={FieldType.INPUT}
                            name="name"
                            label="Name"
                            placeholder="Enter your category name..."
                        />
                    </div>
                    <div className="w-full">
                        <CustomForm  
                            control={form.control}
                            type={FieldType.INPUT}
                            name="slug"
                            label="Slug"
                            placeholder="Slug will be generated automatically"
                            value={slugValue}
                            disabled={true}
                        />
                    </div>
                </div>
                <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full my-7 flex"
                    disabled={isLoading} // Tombol dinonaktifkan saat loading
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <ScanBarcode className="text-white" />
                            <span className="text-white">Save Category</span>
                        </>
                    )}
                </Button>
            </form>
        </Form>
    </div>
  )
}

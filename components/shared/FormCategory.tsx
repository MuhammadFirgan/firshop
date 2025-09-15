'use client'

import { categorySchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form } from "../ui/form"
import CustomForm, { FieldType } from "./CustomForm"
import { Button } from "../ui/button"
import { ScanBarcode } from "lucide-react"
import { useEffect } from "react"
import { generateSlug } from "@/lib/utils"


export default function FormCategory() {

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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full my-7 flex">
                        <ScanBarcode className="text-white" />
                        <span className="text-white">Save Category</span>
                </Button>
            </form>
        </Form>
    </div>
  )
}

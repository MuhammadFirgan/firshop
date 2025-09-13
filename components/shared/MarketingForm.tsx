'use client'

import { marketingSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import z from "zod"
import { Form, FormField, FormItem, FormMessage } from "../ui/form"
import CustomForm, { FieldType } from "./CustomForm";

import { Button } from "../ui/button";
import { CustomCalendar } from "./CustomCalendar";
import { createMarketing, uploadImageMarketing } from "@/lib/action/marketing.action";
import { useRouter } from "next/navigation";
import { ScanBarcode } from "lucide-react";
import FileUpload from "./FileUpload";


export default function MarketingForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof marketingSchema>>({
        resolver: zodResolver(marketingSchema),
        defaultValues: {
            ...marketingSchema,
            discount: '',
            tagline: '',
            thumbnail: ''
        }
    })

    async function onSubmit(values: z.infer<typeof marketingSchema>) {
        try {
            const parsedValues = {
                ...values,
                start_date: values.start_date.toISOString(),
                end_date: values.end_date.toISOString(),
                discount: Number(values.discount),
            }

            const result = await createMarketing(parsedValues)
        
            if (result?.success) {
                router.push('/dashboard/marketing');
            } 
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col items-center md:flex-row gap-4">
                    <div className="w-full">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.NUMBER}
                            name="discount"
                            label="Discount"
                            placeholder="Enter the discount..."
                        />
                    </div>
                    <div className="w-full">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="tagline"
                            label="Tagline"
                            placeholder="Enter the tagline..."
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row gap-4">
                    <div className="w-full">
                        <CustomCalendar
                            control={form.control}
                            name="start_date"
                            label="Start Date"
                            placeholder="Pick a date"
                        />
                    </div>
                    <div className="w-full">
                        <CustomCalendar
                            control={form.control}
                            name="end_date"
                            label="End Date"
                            placeholder="Pick a date"
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                        <FileUpload 
                            value={field.value} 
                            onFieldChange={field.onChange}
                            onUpload={uploadImageMarketing}
                        />
                        <FormMessage className="text-sm text-red-500"/>
                        </FormItem>
                    )}
                />
                <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full my-7 flex">
                        <ScanBarcode className="text-white" />
                        <span className="text-white">Save Product</span>
                </Button>
            </form>
        </Form>
    </div>
  )
}

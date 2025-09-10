'use client'

import { marketingSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import z from "zod"
import { Form } from "../ui/form"
import CustomForm, { FieldType } from "./CustomForm";

import { Button } from "../ui/button";
import { CustomCalendar } from "./CustomCalendar";


export default function MarketingForm() {
    const form = useForm<z.infer<typeof marketingSchema>>({
        resolver: zodResolver(marketingSchema),
        defaultValues: {
            ...marketingSchema,
            discount: '',
            tagline: '',
            poster: ''
        }
    })

    async function onSubmit(values: z.infer<typeof marketingSchema>) {

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
                <div className="w-full">
                    <CustomForm 
                        control={form.control}
                        type={FieldType.UPLOAD}
                        name="thumbnail"
                        label="Product Image"
                        placeholder="Enter the image..."
                    />
                </div>
            </form>
        </Form>
    </div>
  )
}

'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Form, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"


import { z } from "zod"

import { useRouter } from "next/navigation"

import { storeSchema } from "@/lib/validation"
import CustomForm, { FieldType } from "./CustomForm"
import FileUpload from "./FileUpload"
import { createStore, uploadBannerStore, uploadProfileStore } from "@/lib/action/store.action"
import { useState } from "react"
import { Loader2, Store } from "lucide-react"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"



export default function CreateStoreForm() {
    const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      profile: "",
      banner: "",
    },
  })


  async function onSubmit(values: z.infer<typeof storeSchema>) {
    console.log(values)
    // setIsLoading(true)
    // try {
    //     const newStore = await createStore(values)

    //     if(newStore) {

    //         router.push('/mystore')
    //     }

    // } catch (error) {
    //     console.error(error)
    // } finally {
    //     setIsLoading(false)
    // }
   
  }

  return (
    <section className="min-w-full mb-16">
            {/* RHF Provider */}
            <Form {...form}>
                {/* HTML Form Tag */}
                <form id="form-store" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FieldGroup>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <CustomForm 
                                    id="name" 
                                    control={form.control}
                                    type={FieldType.INPUT}
                                    name="name"
                                    label="Name"
                                    placeholder="Enter your store name..."
                                />
                            </div>
                            <div className="w-full">
                                <CustomForm 
                                    id="address"
                                    control={form.control}
                                    type={FieldType.INPUT}
                                    name="address"
                                    label="Address"
                                    placeholder="Enter your store address..."
                                />
                            </div>
                        </div>
                        <CustomForm 
                            id="description"
                            control={form.control}
                            type={FieldType.TEXTAREA}
                            name="description"
                            label="Description"
                            placeholder="Enter your store description..."
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <Controller
                                    control={form.control}
                                    name="profile"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="profile">Profile Photo</FieldLabel>
                                            <FileUpload 
                                                value={field.value} 
                                                onFieldChange={field.onChange}
                                                onUpload={uploadProfileStore}
                                             />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                        
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <Controller
                                    control={form.control}
                                    name="banner"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="profile">Banner store</FieldLabel>
                                            <FileUpload 
                                                value={field.value} 
                                                onFieldChange={field.onChange}
                                                onUpload={uploadBannerStore}
                                             />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                        
                                    )}
                                />
                               
                            </div>
                        </div>
                    </FieldGroup>
                    
                    {/* --- Perbaikan: Tombol Submit di dalam form --- */}
                    <Button 
                       
                        type="submit" 
                        className="w-full bg-gradient mt-8" 
                        disabled={isLoading} 
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Store className="text-white" />
                                <span className="text-white">Create Store</span>
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </section>
  )
}

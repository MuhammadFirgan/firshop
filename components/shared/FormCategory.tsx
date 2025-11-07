'use client'

import { categorySchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "../ui/button"
import { Loader2, ScanBarcode } from "lucide-react"
import { useEffect, useState } from "react"
import { generateSlug } from "@/lib/utils"
import { createCategory } from "@/lib/action/category.action"
import { useRouter } from "next/navigation"
import useLoading from "@/hooks/useLoading"
import { FieldGroup } from "../ui/field"
import { FormInput } from "./CustomForm"
import { toast } from "sonner"

interface MarketingFormProps {
  mode: 'create' | 'edit';
  initialData?: z.infer<typeof categorySchema> & { slug: string }; 
}


export default function FormCategory({ mode, initialData }: MarketingFormProps) {
    
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

    const { isLoading, handleLoading } = useLoading(form.handleSubmit)

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        try {
            
            const newCategory = await createCategory({...values})
    
            if(newCategory.errors) {
                toast("Failed to create new category")
            } else {

                toast.success("Category created successfully")
            }

            router.push('/dashboard/categories')
            
        } catch (error) {
            console.error(error)
        } 
    }
  return (
    <form onSubmit={handleLoading(onSubmit)} className="my-8">
        <FieldGroup>
            <div className="flex flex-col gap-3">
                <FormInput control={form.control} name="name" label="Category Name" />
                <FormInput control={form.control} name="name" label="slug" disabled />
            </div>
            <Button type="submit" className='bg-gradient-to-r from-blue-600 to-indigo-600' disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Save Category'}
            </Button>
        </FieldGroup>
    </form>
    // <div>
    //     <Form {...form}>
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //             <div className="flex flex-col md:flex-row gap-4">
    //                 <div className="w-full">
    //                     <CustomForm  
    //                         control={form.control}
    //                         type={FieldType.INPUT}
    //                         name="name"
    //                         label="Name"
    //                         placeholder="Enter your category name..."
    //                     />
    //                 </div>
    //                 <div className="w-full">
    //                     <CustomForm  
    //                         control={form.control}
    //                         type={FieldType.INPUT}
    //                         name="slug"
    //                         label="Slug"
    //                         placeholder="Slug will be generated automatically"
    //                         value={slugValue}
    //                         disabled={true}
    //                     />
    //                 </div>
    //             </div>
    //             <Button 
    //                 type="submit" 
    //                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full my-7 flex"
    //                 disabled={isLoading} // Tombol dinonaktifkan saat loading
    //             >
    //                 {isLoading ? (
    //                     <>
    //                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //                         <span>Saving...</span>
    //                     </>
    //                 ) : (
    //                     <>
    //                         <ScanBarcode className="text-white" />
    //                         <span className="text-white">Save Category</span>
    //                     </>
    //                 )}
    //             </Button>
    //         </form>
    //     </Form>
    // </div>
  )
}

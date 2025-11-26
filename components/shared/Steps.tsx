'use client'


import { Button } from "../ui/button";
import { ScanBarcode } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import FileUpload from "./FileUpload";
import ProductCategory from "./ProductCategory";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { createProduct, updateProducts, uploadImageProduct } from "@/lib/action/product.action";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import { FieldGroup } from "../ui/field";
import { FormInput, FormSelect, FormTextarea, FormUpload } from "./CustomForm";
import { SelectItem } from "../ui/select";
import CategoryStore from "./CategoryStore";



interface dataEditProps {
  id?: string
  name: string
  description: string
  category: string
  price: number
  stock: number
}



export default function Step({ dataEdit, type }: { dataEdit?: dataEditProps, type: 'create' | 'update' }) {
  
  const defaultFormValues = type === 'update' && dataEdit
    ? {
      productName: dataEdit.name,
      category: dataEdit.category,
      description: dataEdit.description,
      price: dataEdit.price.toString(),
      stock: dataEdit.stock.toString(),
      // Tambahkan properti lain yang relevan di sini
    }
    : {
      ...formSchema,
      productName: '',
      category: '', // Pastikan category diinisialisasi
      description: '',
      price: '',
      stock: '',
    };

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  })

  const { isLoading, handleLoading } = useLoading(form.handleSubmit)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = {
      ...values,
      price: parseFloat(values.price),
      stock: parseInt(values.stock, 10),
    };

    if (type === "create") {

      try {

        const newProduct = await createProduct(parsedValues);
       
        
        if(newProduct.errors) {
            toast("Failed to create new category")
        } else {

            toast.success("Category created successfully")
            router.push('/dashboard/product')
        }
  
      } catch (error) {
        console.error(error)
        toast("An error occurred while saving the product.")
      }
    }

    if (type === "update") {
      try {
        const updateProduct = await updateProducts({
          id: dataEdit?.id!,
          products: parsedValues
        });
        if(updateProduct) {
          router.push('/dashboard/product')
        }
        toast("successfully updated product.")
      } catch (error) {
        console.error(error)
        toast("An error occurred while edit the product.")
      }
    }
  }
  
  return (
    <section>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-5 rounded-lg flex flex-col gap-4 my-4">
        <h1>Enter the basic information about your product</h1>
      </div>
      
      <div className="py-8">
        <form onSubmit={handleLoading(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <FormInput control={form.control} name="productName" label="Product Name"/>
              {/* @ts-ignore */}
              <CategoryStore control={form.control} name="category" label="Category"/>
            </div>
            <FormTextarea control={form.control} name="description" label="Description"/>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <FormInput control={form.control} name="price" label="Price" />
              <FormInput control={form.control} name="stock" label="Stock" />
            </div>
            <FormUpload control={form.control} name="thumbnail" label="Thumbnail" onUpload={uploadImageProduct}/>
            <Button type="submit" className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 !text-white' disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Save Store'}
            </Button>
          </FieldGroup>
        </form>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center md:flex-row gap-4">
              <div className="w-full">
                <CustomForm  
                    control={form.control}
                    type={FieldType.INPUT}
                    name="productName"
                    label="Product Name"
                    placeholder="Enter your product name..."
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                              <ProductCategory onChangeHandler={field.onChange} value={field.value} />
                          </FormControl>

                          <FormMessage className="text-sm text-red-500"/>
                      </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <CustomForm  
                control={form.control}
                type={FieldType.TEXTAREA}
                name="description"
                label="Description"
                placeholder="Enter your product description..."
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <CustomForm  
                    control={form.control}
                    type={FieldType.NUMBER}
                    name="price"
                    label="Price"
                    placeholder="Enter your product price..."
                />
              </div>
              <div className="w-full">
                <CustomForm  
                    control={form.control}
                    type={FieldType.NUMBER}
                    name="stock"
                    label="Stock"
                    placeholder="Enter your product stock..."
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
                        onUpload={uploadImageProduct}
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
        </Form> */}
      </div>
    </section>
  )
}

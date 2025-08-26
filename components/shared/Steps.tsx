'use client'


import { Button } from "../ui/button";
import { ScanBarcode } from "lucide-react";
import { ProductState } from "./Steps3";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import CustomForm, { FieldType } from "./CustomForm";
import FileUpload from "./FileUpload";
import ProductCategory from "./ProductCategory";



export default function Step() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        ...formSchema,
        productName: '',
        description: '',
        price: '',
        stock: '',
        
      },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values : ", values);
  }
  
  return (
    <section>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-5 rounded-lg flex flex-col gap-4 my-4">
        <h1>Enter the basic information about your product</h1>
      </div>
      
      <div className="py-8">
        <Form {...form}>
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
                      <FileUpload value={field.value} onFieldChange={field.onChange}/>
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

      {/* <form action={formAction} className="w-full flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col w-full gap-3">
            <Label htmlFor="productName">Product Name</Label>
            <Input 
              id="productName"
              className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 
                  ${state?.errors ? 'border-red-500' : ''}`}
              defaultValue={state?.productName}
              name="productName"
            />
            {state?.errors?.productName && (
              <p className="text-sm text-red-500">{state.errors.productName[0]}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-3">
            <Label className="text-slate-600">Category Product</Label>
            <Select defaultValue={state?.category} name="category">
                <SelectTrigger className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 w-full ${state?.category ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  
                </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p className="text-sm text-red-500">{state.errors.category[0]}</p>
            )}
            
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-slate-600">Description</Label>
          <Textarea name="description" className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 h-60 ${state?.description ? 'border-red-500' : ''}`} defaultValue={state?.description ?? ''}/>
          {state?.errors?.description && (
              <p className="text-sm text-red-500">{state.errors.description[0]}</p>
          )}
          
        </div>

        <div className="flex flex-col gap-4 w-full md:flex-row">
          <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="productPrice" className="text-slate-600">Product Price</Label>
              <Input 
                  type="number"
                  id="productPrice"
                  className={`transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 ${state?.productName ? 'border-red-500' : ''}`}
                  defaultValue={state?.price ?? 0}
                  name="price"
              />

            {state?.errors?.price && (
              <p className="text-sm text-red-500">{state.errors.price[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-slate-600">Product stock</Label>
            <Input 
                type="number"
                id="stock"
                name="stock"
                className="transition-all duration-300 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                defaultValue={state?.stock ?? 0}
            />
            {state?.errors?.stock && (
              <p className="text-sm text-red-500">{state.errors.stock[0]}</p>
            )}
          </div>
         
        
        </div>
        <div className="w-full flex flex-col gap-3 ">
          <Label>Gambar Produk</Label>
          <Step4Images />
          {state?.errors?.images && (
            <p className="text-sm text-red-500">{state.errors.images}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full my-7 flex">
            <ScanBarcode className="text-white" />
            <span className="text-white">Save Product</span>
          </Button>
      </form> */}
    </section>
  )
}

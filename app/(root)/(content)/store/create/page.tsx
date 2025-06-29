'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"

import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { createStore } from "@/lib/action/store.action"
import { formSchema } from "@/lib/validation"
import { v4 as uuidv4 } from 'uuid'
import { createClientSupabase } from "@/lib/supabase/client"
import { useUser } from "@clerk/nextjs"



export default function page() {

  const router = useRouter()

  const { user } = useUser()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try {
      const supabase = await createClientSupabase()

      const file = values.poster as File

      const fileText = values.poster?.name.split('\\')?.pop()?.split(".")[0].toLowerCase().replace(/\s+/g, "-")
      

      const fileName = `${uuidv4()}-${fileText}`
      
      const filePath = `${user?.id}/${fileName}` 

      const { data, error } = await supabase.storage.from("firshop-bucket").upload(filePath, file)

      if(error || !data) throw new Error(error?.message)

      const { data: publicUrlData } = await supabase.storage.from("firshop-bucket").getPublicUrl(filePath)

      const fileUrl = publicUrlData.publicUrl

      console.log("file url : ", fileUrl)

      console.log(data)

      // const createNewStore = await createStore(values)
      // console.log(createNewStore)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="flex justify-center items-center h-screen flex-col">
      <div className="max-w-lg">
        <h1 className="mb-10 text-3xl">You're Not Open the Store Yet, Open Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your shop name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your shop name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="poster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poster</FormLabel>
                  <FormControl>
                  <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

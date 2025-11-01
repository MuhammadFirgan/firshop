'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { storeSchema } from '@/lib/validation'
import z from 'zod'
import { Field, FieldGroup } from '@/components/ui/field'
import { FormInput, FormTextarea, FormUpload } from '@/components/shared/CustomForm'
import { Button } from '@/components/ui/button'
import { createStore, uploadBannerStore, uploadProfileStore } from '@/lib/action/store.action'
import useLoading from '@/hooks/useLoading'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'




export default function page() {

  const router = useRouter()
  
  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      profile: '',
      banner: ''
    }
  })

  const { isLoading, handleLoading } = useLoading(form.handleSubmit)

  async function onSubmit(data: z.infer<typeof storeSchema>) {
    try {
      const newStore = await createStore(data)
      console.log(newStore)

      if(newStore?.error) {
        toast(newStore?.error || 'Failed to create store')
        console.error("Error creating store:", newStore.error)
        return
      }
   

      // if(newStore) router.push('/my-store')
    } catch (error) {
      // toast(error?.errors?.database[0] || 'Failed to create store')
      console.error("Error creating store:", error)
    }
  }

  return (
    <form onSubmit={handleLoading(onSubmit)} className='mb-8'>
        <FieldGroup>
            <div className="flex flex-col w-full md:flex-row gap-4">
                <FormInput control={form.control} name="name" label="Store Name"/>
                <FormInput control={form.control} name="address" label="Address"/>
            </div>
            <FormTextarea control={form.control} name="description" label="Description"/>
            <div className="flex flex-col w-full md:flex-row gap-4">
                <FormUpload control={form.control} name="profile" label="Profile" onUpload={uploadProfileStore}/>
                <FormUpload control={form.control} name="banner" label="Banner" onUpload={uploadBannerStore}/>
            </div>
            <Button type="submit" className='bg-gradient' disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Create Store'}
            </Button>
        </FieldGroup>
    </form>
  )
}
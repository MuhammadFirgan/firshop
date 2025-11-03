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


interface StoreFormProps {
  mode: 'create' | 'edit';
  initialData?: z.infer<typeof storeSchema> & { slug: string }; 
}


export default function page({ mode, initialData }: StoreFormProps) {

  const router = useRouter()
  
  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      address: initialData?.address || '',
      profile: initialData?.profile || '',
      banner: initialData?.banner || ''
    }
  })

  const { isLoading, handleLoading } = useLoading(form.handleSubmit)

  async function onSubmit(data: z.infer<typeof storeSchema>) {
    try {
      let result 

      if(mode === "create") {
        const newStore = await createStore(data)
      } 
      if(mode === "edit") {
        if(!initialData?.slug) {
          toast.error('Failed to update store')
          router.push('/store')
        }
          // result = await updateStore(initialData.id, data)
      }
      if(result && 'error' in result) {
        toast.error('Failed to create store')
      }

      toast.success(`Store successfully ${mode === 'create' ? 'created' : 'updated'}!`)
      router.push('/store')
   
    } catch (error) {
      toast.success(`Error to ${mode === 'create' ? 'created' : 'updated'} store!`)
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
              {isLoading ? 'Processing...' : 'Save Store'}
            </Button>
        </FieldGroup>
    </form>
  )
}
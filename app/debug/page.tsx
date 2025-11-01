'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { storeSchema } from '@/lib/validation'
import z from 'zod'
import { FieldGroup } from '@/components/ui/field'
import { FormInput } from '@/components/shared/CustomForm'
import { Button } from '@/components/ui/button'

export default function Test2() {
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

  const onSubmit = (data: z.infer<typeof storeSchema>) => {
    console.log('✅ onSubmit with Zod:', data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
            <FormInput control={form.control} name="name" label="Store Name"/>
            <FormInput control={form.control} name="description" label="Store Dame"/>
            <FormInput control={form.control} name="address" label="Store address"/>
            <FormInput control={form.control} name="profile" label="Store profile"/>
            <FormInput control={form.control} name="banner" label="Store banner"/>
            <Button type="submit">Create Store</Button>
        </FieldGroup>
    </form>
  )
}
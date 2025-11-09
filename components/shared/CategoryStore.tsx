// components/CategoryStore.tsx
'use client'

import { useEffect, useState } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { FormSelect } from './CustomForm'
import { SelectItem } from '../ui/select'
import { getAllCategories } from '@/lib/action/category.action'
import { Skeleton } from '../ui/skeleton'


interface CategoryStoreProps<T extends FieldValues> {
  control: Control<T>
  name: string
  label: string
}

export default function CategoryStore<T extends FieldValues>({
  control,
  name,
  label,
}: CategoryStoreProps<T>) {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        // @ts-ignore
        setCategories(data)
      } catch (err) {
        setError('Failed to load categories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) return (
    <Skeleton className="w-full rounded-full" />
  )
  if (error) return <div>{error}</div>


  return (
    // @ts-ignore
    <FormSelect control={control} name={name} label={label} placeholder='Select a category'>
      {categories.map((category) => (
        <SelectItem key={category.name} value={category.id}>
          {category.name}
        </SelectItem>
      ))}
    </FormSelect>
  )
}

import StoreForm from '@/components/shared/StoreForm';
import { getStoreBySlug } from '@/lib/action/store.action';

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const {slug} = await params

  const resultStoreSlug = await getStoreBySlug(slug)

  
  return (
    <section className="min-w-full px-6">
      <div className="flex flex-col gap-4 mt-24 mb-8 lg:mt-6">
        <h1 className="gradient-text text-2xl font-semibold">Create New Store</h1>
        <p className="text-sm text-gray-500">Create new store to become seller</p>
      </div>
    
      <StoreForm mode="edit" initialData={resultStoreSlug} />
      
      
    </section>
  )
}

import CreateStoreForm from "@/components/shared/CreateStoreForm";
import HeaderSectionDashboard from "@/components/shared/HeaderSectionDashboard";
import dynamic from "next/dynamic";


export default function page() {

  // const DynamicNewStore = dynamic(() => import('@/components/shared/CreateStoreForm'))


  return (
    <section className="min-w-full px-6">
      <div className="flex flex-col gap-4 mt-24 mb-8 lg:mt-6">
        <h1 className="gradient-text text-2xl font-semibold">Create New Store</h1>
        <p className="text-sm text-gray-500">Create new store to become seller</p>
      </div>
    
      {/* <DynamicNewStore /> */}
      <CreateStoreForm />
      {/* <Coba /> */}
      
    </section>
  )
}

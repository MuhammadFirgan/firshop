import MarketingForm from "@/components/shared/MarketingForm";
import dynamic from "next/dynamic";

export default function page() {

  const DynamicMarketingForm = dynamic(() => import('@/components/shared/MarketingForm'), { ssr: false })

  return (
    <section className="p-7 h-screen md:pl-20 md:pr-16 mt-24 md:-mt-48 ">
        <div className="mb-5">
           <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
             Marketing
           </h1>
           <p className="text-slate-600 mt-1">Here’s What We Offer: A Closer Look at Our Products</p>
         </div>

        <DynamicMarketingForm />
    </section>
  )
}

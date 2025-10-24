import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <div className='hidden lg:block md:mt-24'>
          <Sidebar type="other"/>
        </div>
        <section className='flex w-full min-h-screen max-md:pb-14 md:pl-72 md:mt-24'>

          {children}
        </section>
      </div>
      <Footer />
      
    </main>
  )
}

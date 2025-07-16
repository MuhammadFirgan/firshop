import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <div className='hidden lg:block md:pt-24'>
          <Sidebar />
        </div>
        <section className='flex min-h-screen max-md:pb-14 md:pl-72'>

          {children}
        </section>
      </div>
      <Footer />
    </main>
  )
}

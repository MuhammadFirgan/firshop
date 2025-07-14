import Footer from '@/components/organism/Footer'
import Navbar from '@/components/organism/Navbar'
import Sidebar from '@/components/organism/Sidebar'


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <div className='hidden lg:block md:pt-14'>
          <Sidebar />
        </div>
        <section className='flex min-h-screen max-md:pb-14 '>

          {children}
        </section>
      </div>
      <Footer />
    </main>
  )
}

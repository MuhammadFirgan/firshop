import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <>
    
    <Navbar />
    <main className="px-10 relative">
    {children}
    </main>
    <Footer />
    </>
  )
}

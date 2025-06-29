import Footer from '@/components/organism/Footer'
import Navbar from '@/components/organism/Navbar'


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

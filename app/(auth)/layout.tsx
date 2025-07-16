import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <main className="flex justify-center items-center h-screen">
    {children}
    </main>
  )
}

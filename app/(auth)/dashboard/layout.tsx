import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Sidebar type="dashboard"/>
      <div className="relative">
        <Navbar type="dashboard" />
        {/* <main className="px-4 sm:px-6 lg:px-8 lg:pl-60 -pt-96"> */}
        <main className="w-full md:pl-60 md:mt-80">
   
          {children}
        </main>
      </div>
    </div>
  )
}

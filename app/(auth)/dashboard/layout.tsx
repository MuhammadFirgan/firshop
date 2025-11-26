import GetNavigation from "@/components/shared/GetNavigation";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { getUserByRole } from "@/lib/action/auth.action";


export default async function layout({ children } : {children: React.ReactNode}) {

  const userRole = await getUserByRole()

  const navigation = GetNavigation(userRole)

  return (
    <div className="min-h-screen w-full">
    {/* <div className="min-h-screen w-full "> */}
      <Sidebar type="dashboard" navigation={navigation} />
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

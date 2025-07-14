import Navbar from "@/components/organism/Navbar";
import Sidebar from "@/components/organism/Sidebar";


export default function layout({ children } : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Sidebar type="dashboard"/>
      <div className="relative">
        <Navbar type="dashboard" />
        {/* <main className="px-4 sm:px-6 lg:px-8 lg:pl-60 -pt-96"> */}
        <main className="md:pl-60 md:-mt-96">
          {/* <div className="mx-auto max-w-7xl space-y-8">
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Welcome back, Admin
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  Here's what's happening with your store today.
                </p>
              </div>
            </div>

            
            <DashboardStats />

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <div className="lg:col-span-1">
                <CustomerInsights />
              </div>
            </div>

           
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <ProductGrid />
              </div>
              <div className="xl:col-span-1">
                <RecentOrders />
              </div>
            </div>
          </div> */}
          {children}
        </main>
      </div>
    </div>
  )
}

import Metrics from '@/components/shared/Metrics';
import RecentOrder from '@/components/shared/RecentOrder';
import TopProducts from '@/components/shared/TopProducts';

export default function page() {

    
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-[600px] md:mt-80">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Good morning, Firgan 👋</h1>
          <p className="text-slate-600 mt-1">Here's what's happening with your store today</p>
        </div>
        
      </div>

      
      <Metrics />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <RecentOrder />

        {/* Top Products */}
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Top Products</h2>
          <TopProducts />
        </div>
      </div>
    </div>
  )
}


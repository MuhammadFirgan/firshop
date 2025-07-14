import { ShoppingCart } from "lucide-react";

const recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', amount: '$234.50', status: 'Completed', date: '2 mins ago' },
    { id: '#ORD-002', customer: 'Mike Chen', amount: '$89.99', status: 'Processing', date: '5 mins ago' },
    { id: '#ORD-003', customer: 'Emma Davis', amount: '$156.75', status: 'Shipped', date: '12 mins ago' },
    { id: '#ORD-004', customer: 'James Wilson', amount: '$299.00', status: 'Pending', date: '18 mins ago' },
];

export default function RecentOrder() {
  return (
    <div className="lg:col-span-2 glass-card py-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View all</button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{order.id}</p>
                    <p className="text-sm text-slate-600">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{order.amount}</p>
                  <p className="text-xs text-slate-500">{order.date}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

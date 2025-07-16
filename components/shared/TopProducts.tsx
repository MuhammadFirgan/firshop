const topProducts = [
    { name: 'Wireless Headphones', sales: 145, revenue: '$14,500', image: '🎧' },
    { name: 'Smart Watch', sales: 98, revenue: '$19,600', image: '⌚' },
    { name: 'Laptop Stand', sales: 87, revenue: '$6,525', image: '💻' },
    { name: 'Phone Case', sales: 76, revenue: '$2,280', image: '📱' },
  ];
export default function TopProducts() {
  return (
    <div className="space-y-4">
        {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center space-x-4 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200">
            <div className="text-2xl">{product.image}</div>
            <div className="flex-1">
                <p className="font-medium text-slate-800">{product.name}</p>
                <p className="text-sm text-slate-600">{product.sales} sales</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-slate-800">{product.revenue}</p>
            </div>
            </div>
        ))}
    </div>
  )
}

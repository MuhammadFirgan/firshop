import { BarChart3, Bell, ChartBarStacked, Home, Package, Settings, ShoppingCart, Users } from 'lucide-react';

export type rolesProps = 'super_admin' | 'employee' | 'user'

export type NavigationItem = {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>
    current: boolean;
  };

export default function GetNavigation(role: rolesProps) {
    const baseNavigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
        { name: 'Products', href: '/dashboard/product', icon: Package, current: false },
        { name: 'Categories', href: '/dashboard/categories', icon: ChartBarStacked, current: false },
        { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart, current: false },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: false },
        { name: 'Marketing', href: '/dashboard/marketing', icon: Bell, current: false },
    ];

    if(role === 'super_admin') {
        baseNavigation.splice(4, 0, {
            name: 'Users',
            href: '/dashboard/users',
            icon: Users,
            current: false
        })
    }


    return baseNavigation
}

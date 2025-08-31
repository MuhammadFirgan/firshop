import { BarChart3, Bell, Home, Package, Settings, ShoppingCart, Users } from 'lucide-react';

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
        { name: 'Orders', href: '#', icon: ShoppingCart, current: false },
        { name: 'Analytics', href: '#', icon: BarChart3, current: false },
        { name: 'Marketing', href: '#', icon: Bell, current: false },
        { name: 'Settings', href: '#', icon: Settings, current: false },
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

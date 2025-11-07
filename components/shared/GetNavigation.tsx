import { BarChart3, Bell, ChartBarStacked, Home, Package, ShoppingCart, Users } from 'lucide-react';

export type rolesProps = 'super_admin' | 'seller' | 'user';

// Tipe data dasar untuk item navigasi
export type NavigationItem = {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    current: boolean;
};

// Tipe data internal untuk menentukan level akses
type FullNavigationItem = NavigationItem & { access: 'seller_and_admin' | 'super_admin_only' | 'seller_only' };

export default function GetNavigation(role: rolesProps): NavigationItem[] {
    
    // 1. Definisikan peta navigasi lengkap dengan level akses yang sesuai dengan middleware
    const fullNavigation: FullNavigationItem[] = [
        
        // 1. /dashboard (Akses: Seller & Super Admin)
        { name: 'Dashboard', href: '/dashboard', icon: Home, current: true, access: 'seller_and_admin' },
        { name: 'Home', href: '/', icon: Home, current: false, access: 'seller_and_admin' },
        
        // 2. /dashboard/product, 6. /dashboard/analytics, 7. /dashboard/orders (Akses: Seller & Super Admin)
        { name: 'Products', href: '/dashboard/product', icon: Package, current: false, access: 'seller_only' },
        { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart, current: false, access: 'seller_only' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: false, access: 'seller_and_admin' },
        
        // 3. /dashboard/categories, 4. /dashboard/marketing, 5. /dashboard/users (Akses: Super Admin ONLY)
        { name: 'Categories', href: '/dashboard/categories', icon: ChartBarStacked, current: false, access: 'super_admin_only' },
        { name: 'Marketing', href: '/dashboard/marketing', icon: Bell, current: false, access: 'super_admin_only' },
        { name: 'Users', href: '/dashboard/users', icon: Users, current: false, access: 'super_admin_only' },
    ];

    // 2. Saring navigasi berdasarkan peran pengguna yang sedang login
    const filteredNavigation = fullNavigation.filter(item => {
        
        // Jika aksesnya hanya untuk Super Admin
        if (item.access === 'super_admin_only') {
            return role === 'super_admin';
        }
        
        // Jika aksesnya untuk Seller dan Super Admin
        if (item.access === 'seller_and_admin') {
            return role === 'seller' || role === 'super_admin';
        }

        if(item.access === 'seller_only') {
            return role === 'seller'
        }
        
        // Blokir jika role adalah 'user' atau role tidak valid
        return false;
    });

    return filteredNavigation;
}

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import SidebarContent, { BarTypeProps } from './SidebarContent';



export default function Sidebar({ type, navigation = [] }: BarTypeProps) {
  return (
    <>
      
      <Sheet>
        <SheetTrigger asChild className="lg:hidden block">
          <Button variant="ghost" size="icon" className="lg:hidden block">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent type={type} navigation={navigation}/>
        </SheetContent>
      </Sheet>

      <aside className="fixed left-0 top-0 h-screen p-6 w-[256px] z-10">
        <div className="flex-col gap-5 hidden lg:flex">


          <SidebarContent type={type} navigation={navigation}/>
        </div>
      </aside>
    </>

  )
}

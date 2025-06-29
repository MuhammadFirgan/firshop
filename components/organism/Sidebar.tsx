
import Link from 'next/link'
import Filter from '../Filter'


export default function Sidebar() {


  return (
    <aside className="sticky left-0 top-0 h-screen p-6 w-[256px] border-r-2">
      <div className=" flex-col gap-5 hidden lg:flex">
        <Filter />
      </div>
    </aside>
  )
}

import { bebas_neue, payments } from "@/constans";
import Image from "next/image";
import Link from "next/link";
import { BiLogoFacebookSquare, BiLogoInstagram, BiLogoTiktok, BiLogoYoutube } from "react-icons/bi";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">
              GiftTech
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for premium tech gifts. We curate the best products to help you give meaningful presents.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Facebook size={20} /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Twitter size={20} /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Instagram size={20} /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Linkedin size={20} /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {/* <Mail size={18} className="text-blue-400" /> */}
                <span className="text-gray-400">hello@gifttech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <Phone size={18} className="text-blue-400" /> */}
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                {/* <MapPin size={18} className="text-blue-400" /> */}
                <span className="text-gray-400">123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 GiftTech. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
    // <footer className="pt-20 px-12 ">
    //   <div className="flex flex-col justify-center gap-12 lg:justify-between lg:flex-row">
    //     <div className="max-w-md">
    //       <Link href="/" className="text-stone-800 font-bold text-xl">
    //         <h1 className={`text-4xl ${bebas_neue.className}`}>FirShop</h1>
    //       </Link>
    //       <p className="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eveniet vel quod. Corrupti recusandae quidem consequatur suscipit, praesentium maiores deleniti.</p>
    //       <div className="flex gap-4">
    //         {payments.map(payment => (
    //           <Image key={payment.name} src={`/img/${payment.img}`} width={50} height={50} alt={payment.name} />
    //         ))}
    //       </div>
    //     </div>
    //     <div>
    //       <h3 className={`text-4xl ${bebas_neue.className}`}>Category</h3>
    //       <ul className="text-sm flex flex-col gap-5 my-6">
    //         <li><Link href="">Electronics</Link></li>
    //         <li><Link href="">Jewelery</Link></li>
    //         <li><Link href="">Man's Clothing</Link></li>
    //         <li><Link href="">Woman's Clothing</Link></li>
    //       </ul>
    //     </div>
    //     <div>
    //       <h3 className={`text-4xl ${bebas_neue.className}`}>Service</h3>
    //       <ul className="text-sm flex flex-col gap-5 my-6">
    //         <li><Link href="">Help</Link></li>
    //         <li><Link href="">Contact Us</Link></li>
    //         <li><Link href="">Order Status</Link></li>
    //         <li><Link href="">Delivery</Link></li>
    //         <li><Link href="">Payment Options</Link></li>
    //       </ul>
    //     </div>
    //     <div>
    //       <h3 className={`text-4xl ${bebas_neue.className}`}>Company</h3>
    //       <ul className="text-sm flex flex-col gap-5 my-6">
    //         <li><Link href="">About Us</Link></li>
    //         <li><Link href="">News</Link></li>
    //         <li><Link href="">Terms and Conditions</Link></li>
    //         <li><Link href="">Privacy Policy</Link></li>
    //         <li><Link href="">Inverstors</Link></li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="flex flex-col justify-between sm:flex-row">
    //     <div className="text-sm py-10">
    //       <Link href="/">&copy; 2024 FirShop</Link> | <Link href="/">Privacy Policy</Link> | <Link href="/">Terms and Condition</Link>
    //     </div>
    //     <div className="flex text-2xl gap-6 text-stone-600 items-center">
    //       <BiLogoFacebookSquare />
    //       <BiLogoYoutube />
    //       <BiLogoInstagram />
    //       <BiLogoTiktok />
    //     </div>
    //   </div>
    // </footer>
  )
}

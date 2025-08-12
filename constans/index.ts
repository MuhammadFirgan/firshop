import { Poppins, Bebas_Neue } from "next/font/google";


export const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ["latin"] 
});

export const bebas_neue = Bebas_Neue({ 
  weight: ['400'],
  subsets: ["latin"] 
});

export const payments = [
  {
    name: 'visa',
    img: 'visa.svg'
  },
  {
    name: 'american_express',
    img: 'american_express.svg'
  },
  {
    name: 'google_pay',
    img: 'google_pay.svg'
  },
  {
    name: 'paypal',
    img: 'paypal.svg'
  },
  {
    name: 'mastercard',
    img: 'master_card.svg'
  },
]

export const products= [
    {
      id: 1,
      name: "Wireless Pro Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
      category: "Audio",
      featupurple: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 89,
      category: "Wearable"
    },
    {
      id: 3,
      name: "Mechanical Gaming Keyboard",
      price: 149,
      originalPrice: 179,
      image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 156,
      category: "Gaming",
      featupurple: true
    },
    {
      id: 4,
      name: "Portable Power Bank",
      price: 79,
      image: "https://images.pexels.com/photos/4526524/pexels-photo-4526524.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 67,
      category: "Accessories"
    },
    {
      id: 5,
      name: "4K Action Camera",
      price: 249,
      originalPrice: 299,
      image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 93,
      category: "Camera"
    },
    {
      id: 6,
      name: "Smart Home Speaker",
      price: 129,
      image: "https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      reviews: 78,
      category: "Smart Home"
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      price: 49,
      image: "https://images.pexels.com/photos/4526491/pexels-photo-4526491.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.3,
      reviews: 45,
      category: "Accessories"
    },
    {
      id: 8,
      name: "Gaming Mouse RGB",
      price: 89,
      originalPrice: 109,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 112,
      category: "Gaming"
    }
  ]

export const categories = ['All', 'Audio', 'Wearable', 'Gaming', 'Accessories', 'Camera', 'Smart Home']

export interface Step1Data {
  productName: string;
  category: string;
}

export interface Step2Data {
  description: string;
}

export interface Step3Data {
  price: number;
  stock: number;
}

export interface Step4Data {
  images: File[]; 
}


export interface ProductFormData extends Step1Data, Step2Data, Step3Data, Step4Data {}

// Definisikan props untuk setiap komponen langkah
export interface StepProps {
  formData: ProductFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (value: string) => void;
  onImageChange?: (images: File[]) => void;
}
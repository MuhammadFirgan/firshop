// components/Steps.tsx
'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Check, DollarSign, FileText, ImageIcon, Package } from "lucide-react";
import StepHeader from "./StepHeader";
import StepContent from "./StepContent";
import StepNavigation from "./StepNavigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const steps = [
  { id: 1, title: 'Basic Info', icon: Package },
  { id: 2, title: 'Details', icon: FileText },
  { id: 3, title: 'Pricing', icon: DollarSign },
  { id: 4, title: 'Images', icon: ImageIcon }
];

const initialFormData = {
  name: '',
  category: '',
  brand: '',
  sku: '',
  description: '',
  tags: [] as string[],
  price: '',
  stock: '',
  images: [] as File[]
};

// 1. Definisikan tipe untuk objek formData
type FormData = typeof initialFormData;

export default function Steps() {
  // 2. Gunakan tipe FormData saat mendeklarasikan state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // 3. Tambahkan tipe eksplisit untuk parameter 'field' dan 'value'
  const handleInputChange = (field: keyof FormData, value: string | string[] | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-sm overflow-x-auto md:max-w-full">
      {/* <StepHeader currentStep={currentStep} steps={steps} />
      <div className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <h1 className="text-xl text-slate-800">
            {steps[currentStep - 1].title}
          </h1>
          <div>
            {currentStep === 1 && "Enter the basic information about your product"}
            {currentStep === 2 && "Add detailed description and specifications"}
            {currentStep === 3 && "Set your pricing and inventory details"}
            {currentStep === 4 && "Upload product images to showcase your item"}
          </div>
        </div>
        <StepContent 
          currentStep={currentStep} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          setFormData={setFormData}
        />
        <StepNavigation 
          currentStep={currentStep} 
          steps={steps} 
          prevStep={prevStep} 
          nextStep={nextStep} 
        />
      </div> */}
      <div>
        <div>
          <Label>Product Name</Label>
          <Input 
            className=""
          />
        </div>
      </div>
    </div>
  )
}
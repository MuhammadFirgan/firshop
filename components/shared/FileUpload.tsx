
'use client'

import { useRef, useState, useEffect } from "react"; // <-- Import useEffect
import { Upload, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
// import { uploadImageProduct } from "@/lib/action/product.action"; // Dihapus, tidak digunakan langsung di sini

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Sesuaikan prop onFieldChange dan value untuk menerima satu string atau File
interface UploadFileProps {
  value?: string;
  onFieldChange: (fileUrl: string) => void;
  onUpload: (formData: FormData) => Promise<{ imageUrl?: string; error?: string }>;
  inputId: string; // <-- Tambahkan
}

export default function FileUpload({ onFieldChange, value, onUpload, inputId }: UploadFileProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
      setPreview(value || null);
  }, [value]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      // ... (Logika handleFileUpload, tidak ada perubahan di sini) ...
      const file = e.target.files?.[0];
      
      if (!file) return;

      // ... (Validasi file) ...

      setIsUploading(true);
      
      const formData = new FormData();
      // Menggunakan inputName yang unik (misalnya 'profile' atau 'banner')
      formData.append('thumbnail', file); 
      
      // ... (Panggil Server Action dan set state) ...
      const { imageUrl, error } = await onUpload(formData);
      
      if (imageUrl) {
          setPreview(imageUrl);
          onFieldChange(imageUrl); 
      } else {
          console.error("Upload failed:", error);
      }
      
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = () => {
      setPreview(null);
      onFieldChange(''); 
  };

  return (
      <div className="space-y-6 w-full">
          <div
              className="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 border-slate-300 hover:border-blue-400 hover:bg-blue-50"
          >
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-lg font-medium text-slate-700 mb-2">
                  Drag & drop images here, or click to browse
              </p>
              <p className="text-sm text-slate-500 mb-4">
                  Upload 1 image (JPG, PNG, GIF - Max 5MB)
              </p>
              {/* Gunakan inputId dan inputName yang unik */}
              <Input
                  type="file"
                  accept={ALLOWED_FILE_TYPES.join(',')}
                  onChange={handleFileUpload}
                  className="hidden"
                  id={inputId} // <-- ID UNIK 
                  ref={fileInputRef}
                  disabled={isUploading}
              />
              <Button 
                  asChild 
                  variant="outline" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  disabled={isUploading}
              >
                  {/* Gunakan inputId yang unik di htmlFor */}
                  <label htmlFor={inputId} className="cursor-pointer"> 
                      {isUploading ? 'Uploading...' : 'Choose File'}
                  </label>
              </Button>
          </div>
          
          {preview && (
              <div className="grid grid-cols-1 gap-4">
                  <div className="relative group">
                      <Image
                          src={preview}
                          width={200}
                          height={200}
                          alt="Product Thumbnail"
                          className="w-full h-48 object-cover rounded-lg border border-slate-200"
                      />
                      <Button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                          <Trash2 className="w-3 h-3" />
                      </Button>
                  </div>
              </div>
          )}
      </div>
  );
}
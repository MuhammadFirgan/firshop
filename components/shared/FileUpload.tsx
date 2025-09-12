'use client'

import { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { uploadImageProduct } from "@/lib/action/product.action";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Sesuaikan prop onFieldChange dan value untuk menerima satu string atau File
interface UploadFileProps {
  value?: string;
  onFieldChange: (fileUrl: string) => void;
  onUpload: (formData: FormData) => Promise<{ imageUrl?: string; error?: string }>;

}

export default function FileUpload({ onFieldChange, value, onUpload }: UploadFileProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ambil file pertama saja
    
    if (!file) return;

    // Validasi file
    if (file.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type)) {
      console.error("File tidak valid.");
      return;
    }

    setIsUploading(true);
    
    // Buat FormData untuk mengunggah satu file
    const formData = new FormData();
    formData.append('thumbnail', file); // Kunci 'thumbnail' harus cocok dengan Server Action
    
    // Panggil Server Action
    const { imageUrl, error } = await onUpload(formData);
    
    if (imageUrl) {
      setPreview(imageUrl);
      onFieldChange(imageUrl); // Kirim URL gambar ke form di parent
    } else {
      console.error("Upload failed:", error);
    }
    
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = () => {
    setPreview(null);
    onFieldChange(''); // Reset field di form parent
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
        <Input
          type="file"
          accept={ALLOWED_FILE_TYPES.join(',')}
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          name="thumbnail"
          ref={fileInputRef}
          disabled={isUploading}
        />
        <Button 
          asChild 
          variant="outline" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          disabled={isUploading}
        >
          <label htmlFor="file-upload" className="cursor-pointer">
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
'use server'

import { createServer } from "../supabase/server";
import { v4 as uuidv4 } from 'uuid'

export interface UploadResult {
  imageUrl?: string;
  error?: string;
}

// Fungsi inti yang menangani logika upload
export async function baseUploadHandler(formData: FormData, folderPath: string): Promise<UploadResult> {
    const supabase = await createServer();
    // Asumsi kunci field di FormData selalu 'thumbnail'
    const file = formData.get('thumbnail') as File; 
    
    if (!file || file.size === 0) {
        return { error: 'File tidak ditemukan.' };
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    // Langkah 1: Upload ke Supabase Storage
    const { data, error: uploadError } = await supabase.storage
        .from('thumbnails') // Asumsi bucket 'thumbnails'
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });
    
    if (uploadError) {
        console.error(`Error uploading to ${folderPath}:`, uploadError);
        return { error: `Gagal mengunggah gambar: ${uploadError.message}` };
    }

    // Langkah 2: Dapatkan URL Publik
    const { data: publicUrlData } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(filePath);

    return { imageUrl: publicUrlData.publicUrl };
}
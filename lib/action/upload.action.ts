'use server'

import { createServer } from "../supabase/server";
import { v4 as uuidv4 } from 'uuid'


export interface UploadResult {
  imageUrl?: string;
  error?: string;
}

export async function deleteFile( filePath: string): Promise<void> {
    const supabase = await createServer(); // Panggil lokal

    if (!filePath || typeof filePath !== 'string') {
        console.warn('Attempted to delete a file with an invalid path:', filePath);
        return;
    }

    const pathSegments = filePath.split('/');
    const fileToDeletePath = pathSegments.slice(pathSegments.indexOf('thumbnails') + 1).join('/');

    if (!fileToDeletePath || fileToDeletePath === '') {
        console.warn('Could not extract file path from URL for deletion:', filePath);
        return;
    }

    const { error } = await supabase.storage
        .from('thumbnails')
        .remove([fileToDeletePath]);

    if (error) {
        console.error(`Error deleting file ${fileToDeletePath}`);
        
    } else {
        (`Successfully deleted file: ${fileToDeletePath}`);
    }
}

// Fungsi inti yang menangani logika upload
export async function baseUploadHandler(formData: FormData, folderPath: string, oldFilePath?: string): Promise<UploadResult> {
    const supabase = await createServer()
  
    const file = formData.get('thumbnail') as File; 
    
    if (!file || file.size === 0) {
        if (oldFilePath) {
            return { imageUrl: oldFilePath }; 
        }
        return { error: 'No file provided.' };
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

    // Jika upload berhasil dan ada oldFilePath, hapus file lama
    if (oldFilePath) {
        await deleteFile(oldFilePath);
    }

    // Langkah 2: Dapatkan URL Publik
    const { data: publicUrlData } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(filePath);

    return { imageUrl: publicUrlData.publicUrl };
}
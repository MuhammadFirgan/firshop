'use server'

import { MarketingProps } from "@/types";
import { createServer } from "../supabase/server";
import { getUserByRole } from "./auth.action";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { v4 as uuidv4 } from 'uuid'

export async function createMarketing(data: MarketingProps) {
    try {
        const supabase = await createServer()

        const userRole = await getUserByRole()

        

        if(userRole !== 'employee' && userRole !== 'super_admin') {
            return { error: 'Forbidden' }
        }

        const { data: { user } } = await supabase.auth.getUser()

        if(!user) {
          return { success: false, errors: { general: ['unauthorized'] } }
      }

        const { data: marketing, error: dbError } = await supabase
            .from('marketings')
            .insert({
                user_id: user.id,
                discount: data.discount,
                tagline: data.tagline, 
                start_date: data.start_date,
                end_date: data.end_date,
                thumbnail: data.thumbnail
            })
            .select()
            .single()

            if (dbError) {
              return {
                success: false,
                errors: {
                  database: [dbError.message],
                },
              };
            }

        revalidatePath('/dashboard/marketing')

        return { success: true, data: parseStringify(marketing) };

    } catch (error) {
        console.error(error)
    }
}

export async function getLatestMarketing() {
  try {
    const supabase = await createServer()

    const { data: marketing, error: dbError } = await supabase
      .from('marketings')
      .select("*")
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if(dbError) {
      return {
        success: false,
        errors: {
          database: [dbError.message],
        },
      };
    }

    const formattedData = {
      ...marketing,
      start_date: new Date(marketing?.start_date),
      end_date: new Date(marketing?.end_date)
    }

    return parseStringify(formattedData)

  } catch (error) {
    console.error(error)
  }
}

export async function uploadImageMarketing(formData: FormData) {
    const supabase = await createServer()
    const rawThumbnail = formData.get('thumbnail') as File;
  
    if (!rawThumbnail) {
      console.error("file not provided")
    }
  
  
    const fileExt = rawThumbnail.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `marketing/${fileName}`
    
  
    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(filePath, rawThumbnail, {
        cacheControl: '3600',
        upsert: false,
      })
    
    if(error) {
      console.error(error)
      return { error: 'Failed to Upload Image' }
    }
  
    const { data: publicUrlData } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(filePath)
  
    return { imageUrl: publicUrlData.publicUrl }
  }
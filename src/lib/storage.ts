import { getSupabaseClient } from "./supabase";

const BUCKET = "images";

export async function uploadImage(file: File, path: string): Promise<string> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadImages(
  files: File[],
  folder: string
): Promise<string[]> {
  return Promise.all(
    files.map((file) => {
      const ext = file.name.split(".").pop();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      return uploadImage(file, `${folder}/${name}`);
    })
  );
}

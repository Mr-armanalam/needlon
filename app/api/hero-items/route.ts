/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const offer = formData.get("offer") as string;
    const slug = formData.get("slug") as string;
    const file = formData.get("image") as File;

    if (!file) {
      return Response.json({ error: "Image required" }, { status: 400 });
    }

    const supabase = supabaseServer();

    // --- 1. Upload image to storage ---
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("hero-images")
      .upload(fileName, file, { contentType: file.type });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl }
    } = supabase.storage.from("hero-images").getPublicUrl(fileName);

    // --- 2. Insert into heroItems table ---
    const { error: insertError } = await supabase
      .from("heroItems")
      .insert({
        name,
        description,
        offer,
        slug,
        image: publicUrl
      });

    if (insertError) throw insertError;

    return Response.json({ success: true, image: publicUrl }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

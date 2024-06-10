"use server"

import supabase from "@/utils/supabase";

export default async function DislikeNews(id) {
    const { data: newsData, error: newsError } = await supabase.from("news").select("dislikes_count").eq("id", id).single();
    const { data, error } = await supabase.from("news").update({ dislikes_count: newsData.dislikes_count + 1 }).eq("id", id);

    console.log(data, error);
    return { data, error };
}
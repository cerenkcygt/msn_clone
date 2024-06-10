"use server"

import supabase from "@/utils/supabase";

export default async function LikeNews(id) {
    const { data: newsData, error: newsError } = await supabase.from("news").select("likes_count").eq("id", id).single();
    const { data, error } = await supabase.from("news").update({ likes_count: newsData.likes_count + 1 }).eq("id", id);
    return { data, error };
}
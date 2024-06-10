"use server"

import supabase from "@/utils/supabase";

export default async function GetNotifs() {
    const { data: news, error: newsError } = await supabase.from("news").select("*").order("id", { ascending: false }).limit(3);
    return news;
}
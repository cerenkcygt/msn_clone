import supabase from "@/utils/supabase";
import NewsData from "@/app/components/newsData";

export default async function Page({ params: { id } }) {
    const { data: newsData, error: newsError } = await supabase.from("news").select("*").eq("id", id).single();
    const { data: category, error: categoriesError } = await supabase.from("categories").select("*").eq("id", newsData.category).single();

    return (
        <main className="flex flex-col items-center gap-4 min-h-screen w-full max-w-[1600px] mx-auto px-[164px] py-8 shadow-2xl bg-[#f4f4f2]">
            <div className="content-area flex flex-col w-full ">
                <NewsData newsData={newsData} category={category} />
            </div>
        </main>
    );
}
import Link from "next/link";
import Image from "next/image";
import supabase from "@/utils/supabase";

export default async function Page({ searchParams }) {
    let searchQuery = searchParams.q ?? "";
    const { data: news, error: newsError } = await supabase.from("news").select("*").order("id", { ascending: false }).limit(10);

    return (
        <main className="flex flex-col items-center gap-4 min-h-screen w-full max-w-[1600px] mx-auto px-[164px] py-8 shadow-2xl bg-[#f4f4f2]">
            <div className="content-area flex gap-4 flex-wrap w-full after:block after:w-full after:h-[2px] after:bg-[#e6e6e6] last:after:hidden">
                {news.map(async (newsItem) => {
                    if (searchQuery && !newsItem.title.tr.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return
                    } else {
                        const { data: category, error: categoriesError } = await supabase.from("categories").select("*").eq("id", newsItem.category).single();
                        return (
                            <Link href={"/news/" + newsItem.id} key={newsItem.id} className="news-item group flex gap-4 min-w-[306px] w-[306px] h-[100px] p-2 border border-[#d9d9d96c] rounded-md shadow-md bg-[#fcfcfc]">
                                <div className="news-image min-w-[104px] min-h-[84px]">
                                    <Image src={newsItem.cover_image} alt={newsItem.title.tr} width={104} height={84} className="rounded-md w-[104px] h-[84px]" />
                                </div>
                                <div className="news-content  flex flex-col justify-between">
                                    <h2 className="news-title text-sm p-0 text-ellipsis group-hover:underline">{newsItem.title.tr}</h2>
									<p className="news-description p-0 text-ellipsis">{newsItem.content}</p>
									<p className="date p-0 text-xs">{newsItem.date}</p>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>
        </main>
    );
}
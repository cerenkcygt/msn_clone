import supabase from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }) {
	const { data: categories, error: categoriesError } = await supabase.from("categories").select("*");
	const { data: news, error: newsError } = await supabase.from("news").select("*").order("id", { ascending: false }).limit(10);
	const activeCategory = searchParams.category ?? null;

	return (
		<main className="flex flex-col items-center gap-4 min-h-screen w-full max-w-[1600px] mx-auto px-[164px] py-8 shadow-2xl bg-[#f4f4f2]">
			<div className="category-wrapper w-full p-2">
				<div className="weather-widget"></div>
				<ul className="category-area flex gap-2 cursor-pointer before:block before:w-[2px] before:h-10px before:bg-[#e6e6e6]">
					{categories.map((category) => (
						<li key={category.id} className={`category text-center px-4 first:pl-1 hover:underline ${activeCategory && activeCategory == category.id ? "text-green-600" : ""}`}>
							<Link href={"/?category=" + category.id}>{category.title.tr}</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="content-area flex gap-4 flex-wrap w-full after:block after:w-full after:h-[2px] after:bg-[#e6e6e6] last:after:hidden">
				{/* ---------------- FLOWBITE SLIDER ----------- */}
				<div id="gallery" className="relative max-w-[628px] w-[628px] bg-gray-300" data-carousel="slide">
					{/* <!-- Carousel wrapper --> */}
					<div className="relative h-56 overflow-hidden rounded-lg md:h-96">
						{/* <!-- Item 1 --> */}
						<div className="duration-700 ease-in-out w-[628px] h-[372px]" data-carousel-item>
							<Image width={628} height={372} src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1nV83m.img?w=768&h=432&m=6" className="w-full h-full absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="deneme" />
						</div>
						<div className="duration-700 ease-in-out" data-carousel-item>
							<Image width={628} height={372} src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1nV83m.img?w=768&h=432&m=6" className="w-[628px] h-[372px] absolute block max-w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="debene" />
						</div>
					</div>
					{/* <!-- Slider controls --> */}
					<button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
						<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
							<svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
							</svg>
							<span className="sr-only">Previous</span>
						</span>
					</button>
					<button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
						<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
							<svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
							</svg>
							<span className="sr-only">Next</span>
						</span>
					</button>
				</div>
				{/* ---------------- FLOWBITE SLIDER ----------- */}
				{news.map((newsItem) => {
					if (activeCategory && activeCategory != newsItem.category) {
						return
					} else {
						return (
							<Link href={"/news/" + newsItem.id} key={newsItem.id} className="news-item group flex gap-4 min-w-[306px] w-[306px] h-[100px] p-2 border border-[#d9d9d96c] rounded-md shadow-md bg-[#fcfcfc]">
								<div className="news-image min-w-[104px] min-h-[84px]">
									<Image className="rounded-md w-[104px] h-[84px]" src={newsItem.cover_image} alt={newsItem.title.tr} width={104} height={84} />
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

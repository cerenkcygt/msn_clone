"use client"

import { useState } from 'react';

export default function NotifBox() {
    const [notifBoxOpen, setNotifBoxOpen] = useState(false);
    const [news, setNews] = useState([]);

    async function toggleNotifBox() {
        if (notifBoxOpen == false) {
            const { data: newsArray, error: newsError } = await supabase.from("news").select("*").order("id", { ascending: false }).limit(3);
            setNews(newsArray);
            setNotifBoxOpen(true);
        } else {
            setNotifBoxOpen(false);
        }
    }

    return (
        <div className='notif-wrapper'>
            <div className='notifications-button flex items-center justify-center w-8 h-8 rounded-full' onClick={() => {
                toggleNotifBox()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="#454545" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
            <div className={`notif-box w-full p-2 ${notifBoxOpen == false ? "hidden" : "flex"}`}>
                <h2 className="text-2xl font-bold">Bildirimler</h2>
                <ul className="notif-list">
                    {news.map((newsItem) => (
                        <li key={newsItem.id} className="notif-item flex gap-2">
                            <span className="notif-title">{newsItem.title.tr}</span>
                            <span className="notif-date">{CalculatePassedTime(newsItem.date)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
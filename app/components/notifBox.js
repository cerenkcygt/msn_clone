"use client"

import { useState } from 'react';
import supabase from '@/utils/supabase';
import Link from 'next/link';

function CalculatePassedTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const diffSeconds = diff / 1000;
    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;
    const diffMonths = diffDays / 30;
    const diffYears = diffMonths / 12;

    if (diffSeconds < 60) {
        return `${Math.floor(diffSeconds)}sn`;
    } else if (diffMinutes < 60) {
        return `${Math.floor(diffMinutes)}dk`;
    } else if (diffHours < 24) {
        return `${Math.floor(diffHours)}sa`;
    } else if (diffDays < 30) {
        return `${Math.floor(diffDays)}gün`;
    } else if (diffMonths < 12) {
        return `${Math.floor(diffMonths)}ay`;
    } else {
        return `${Math.floor(diffYears)}yıl`;
    }
}

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
        <div className='notif-wrapper relative z-40'>
            <div className='notifications-button flex items-center justify-center w-8 h-8 rounded-full' onClick={() => {
                toggleNotifBox()
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="#454545" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>
            <div className={`notif-box absolute flex-col rounded-lg bg-white shadow-md w-[300px] p-2 ${notifBoxOpen == false ? "hidden" : "flex"}`}>
                <h2 className="text-xl font-medium">Bildirimler</h2>
                <ul className="notif-list flex gap-2 flex-col group">
                    {news.map((newsItem) => (
                        <li key={newsItem.id} className="notif-item relative flex after:absolute after:bottom-0 after:left-0 after:block after:w-full after:h-[1px] after:bg-[#d9d9d9] after:last:hidden">
                            <Link className='flex gap-2 w-full justify-between hover:bg-gray-200 p-2' href={"/news/" + newsItem.id}>
                                <span className="notif-title text-sm w-11/12">{newsItem.title.tr}</span>
                                <span className="notif-date flex text-right text-xs">{CalculatePassedTime(newsItem.date)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
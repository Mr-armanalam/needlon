'use client'
import React, { useEffect, useState } from "react";
import { Bell, Package, Tag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: "order" | "offer" | "system"; 
  time: Date; 
  read: boolean;
};


const iconMap: Record<string, React.ReactNode> = {
  order: <Package size={20} className="text-blue-600" />,
  offer: <Tag size={20} className="text-green-600" />,
  system: <ShieldCheck size={20} className="text-purple-600" />,
};

export default function NotificationSection() {
  const [allNotification, setAllNotification] = useState<NotificationType[]>([]);

  const fetch_all_notification = async () => {
    const response = await fetch("/api/notification");
    const result = await response.json();
    if (!response.ok) return alert("something went wrong !");
    setAllNotification(result.notification);
  };

  useEffect(() => {
    fetch_all_notification();
  },[])
  

  return (
    <div className="w-full bg-white px-5">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={22} className="text-gray-700" />
        <h1 className="text-xl font-bold font-garamond text-gray-800">
          Notifications
        </h1>
      </div>

      <div className="flex flex-col gap-y-1 divide-y divide-gray-200">
        {allNotification.length !== 0 && allNotification.map((n) => (
          <div
            key={n.id}
            className={`flex gap-4 relative group p-4 transition rounded-xl ${
              !n.read ? "bg-blue-50/70" : "hover:bg-gray-50"
            }`}
          >
            <div className="min-w-[40px] max-h-[40px] rounded-full bg-gray-100 flex items-center justify-center">
              {iconMap[n.type]}
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">{n.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{n.message}</p>
              <span className="text-xs text-gray-500 mt-1 block">{new Date(n.time).getHours()} Hours</span>
            </div>

            <Button
              variant="outline"
              className="absolute top-2 hidden  group-hover:block text-xs hover:bg-blue-300 hover:text-blue-900 cursor-pointer right-2 "
            >
              Mark as read
            </Button>

            {!n.read && (
              <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

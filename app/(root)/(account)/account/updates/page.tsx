import React from "react";
import { Bell, Package, Tag, ShieldCheck } from "lucide-react";

const notifications = [
  {
    id: "n1",
    title: "Your order has been shipped",
    message: "Order #451239 is on the way. Track your package for live updates.",
    type: "order",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    title: "Exclusive 20% OFF for you",
    message: "Use code WELCOME20 on your next purchase. Valid till Dec 30.",
    type: "offer",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "n3",
    title: "Password Changed Successfully",
    message: "Your account password was updated.",
    type: "system",
    time: "1 day ago",
    read: true,
  },
  {
    id: "n4",
    title: "New product launched!",
    message: "Check out our latest winter collection.",
    type: "offer",
    time: "2 days ago",
    read: true,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  order: <Package size={20} className="text-blue-600" />,
  offer: <Tag size={20} className="text-green-600" />,
  system: <ShieldCheck size={20} className="text-purple-600" />,
};

export default function NotificationSection() {
  return (
      <div className="w-full bg-white px-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={22} className="text-gray-700" />
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
        </div>

        <div className="flex flex-col divide-y divide-gray-200">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex gap-4 p-4 transition rounded-xl ${
                !n.read ? "bg-blue-50/70" : "hover:bg-gray-50"
              }`}
            >
              <div className="min-w-[40px] min-h-[40px] rounded-full bg-gray-100 flex items-center justify-center">
                {iconMap[n.type]}
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">{n.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                <span className="text-xs text-gray-500 mt-1 block">{n.time}</span>
              </div>

              {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>}
            </div>
          ))}
        </div>
      </div>
  );
}

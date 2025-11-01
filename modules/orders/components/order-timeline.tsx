"use client";

import React from "react";

interface OrderStep {
  title: string;
  date: string;
  details: string[];
  isActive: boolean;
}

const orderSteps: OrderStep[] = [
  {
    title: "Order Confirmed",
    date: "Fri, 24th Oct '25",
    details: [
      "Your Order has been placed.",
      "Fri, 24th Oct '25 - 2:51am",
      "Seller has processed your order.",
      "Fri, 24th Oct '25 - 9:28pm",
      "Your item has been picked up by delivery partner.",
      "Fri, 24th Oct '25 - 9:28pm",
    ],
    isActive: true,
  },
  {
    title: "Shipped",
    date: "Fri, 24th Oct '25",
    details: [
      "Ekart Logistics - FMPC5381317207",
      "Your item has been shipped.",
      "Fri, 24th Oct '25 - 9:45pm",
      "Your item has been received in the hub nearest to you",
    ],
    isActive: true,
  },
  {
    title: "Out For Delivery",
    date: "Mon, 27th Oct '25",
    details: ["Your item is out for delivery", "Mon, 27th Oct '25 - 9:20am"],
    isActive: true,
  },
  {
    title: "Delivered",
    date: "Mon, 27th Oct '25",
    details: ["Your item has been delivered", "Mon, 27th Oct '25 - 4:32pm"],
    isActive: true,
  },
];

export default function OrderTimeline() {
  return (
    <div className="text-xs">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            February 2022
          </time>
          <h3 className=" font-semibold text-gray-900 dark:text-white">
            Application UI code in Tailwind CSS
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </p>
        </li>
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            March 2022
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Marketing UI design in Figma
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            All of the pages and components are first designed in Figma and we
            keep a parity between the two versions even as we update the
            project.
          </p>
        </li>
        <li className="ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            April 2022
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            E-Commerce UI code in Tailwind CSS
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Get started with dozens of web components and interactive elements
            built on top of Tailwind CSS.
          </p>
        </li>
      </ol>
    </div>
  );
}

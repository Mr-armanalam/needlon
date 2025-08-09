import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const FooterView = () => {
  return (
    <div className="h-full pt-24 grid grid-cols-4 bg-gray-950">
      <div className="col-span-2 ml-20">
        <h1 className="text-6xl font-bold text-zinc-50">THANK YOU!</h1>
        <p className="text-sm text-zinc-500 ml-3 mt-4">
          Your support powers our progress. Innovation starts with you.
        </p>
        <div className="text-zinc-950 w-fit p-2 rounded-full flex gap-x-2 bg-zinc-500 mt-8 ml-3">
          <FaInstagram className="hover:text-zinc-50"/>
          <FaFacebook className="hover:text-zinc-50" />
          <FaLinkedin className="hover:text-zinc-50" />
          <FaWhatsapp className="hover:text-zinc-50" />
        </div>
      </div>
      <div className="col-span-1">
        <h2 className="text-xl mb-4 font-bold text-zinc-50">
          USEFULL LINKS
        </h2>
        <ul className="text-zinc-500 font-garamond flex flex-col gap-y-1.5">
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Careers</li>
          <li>FAQ&apos;s</li>
        </ul>
      </div>
      <div className="col-span-1">
        <h2 className="text-xl mb-4 font-bold text-zinc-50">
          SUPPORT & HELP
        </h2>
        <ul className="text-zinc-500 font-garamond text-md flex flex-col gap-y-1.5">
          <li>Payment</li>
          <li>Cancellation</li>
          <li>Fitting & Alteration</li>
          <li>Deadline Time</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterView;

import React from "react";

const ContactForm = () => {
  return (
    <form className="grid gap-4 grid-cols-2 text-xs">
      <input
        type="text"
        className="outline-1 rounded-xs p-2"
        placeholder="Enter Name"
      />
      <input
        type="email"
        className="outline-1 rounded-xs p-2"
        placeholder="Enter Email"
      />
      <input
        type="text"
        className="outline-1 rounded-xs p-2"
        placeholder="Enter Subject"
      />
      <input
        type="number"
        className="outline-1 rounded-xs p-2"
        placeholder="Enter Phone"
      />
      <textarea
        placeholder="Message"
        rows={6}
        className="outline-1 rounded-xs col-span-2 p-2"
      />

      <div className="flex gap-x-4">
        <button type="submit" className="border px-4 py-2.5 rounded-md bg-stone-900 text-white">SEND MESSAGE</button>
        <button type="button" className="border px-4 font-semibold text-stone-950/70 rounded-md">RESET</button>
      </div>
    </form>
  );
};

export default ContactForm;
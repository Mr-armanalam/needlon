import React, { useState } from "react";

const data = {
  name: "Ready to Wear",
  description:
    "With all the essential elements to elevate your seasonal wardrobe, discover the Fall/Winter 2025 Ready-to-Wear collection – a continuation of our century-long tradition of elegance, rooted in style.",
};

const Heading = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-2">
      <h1 className="text-5xl font-garamond font-semibold uppercase">
        {data.name}
      </h1>
      <p
        className={`text-gray-500 transition-all duration-300 font-roboto-sans max-w-[70vw] mt-4 ${
          expanded ? "line-clamp-none" : "line-clamp-2"
        }`}
      >
        {data.description} Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Architecto quasi ut doloribus magni totam facere quidem corrupti
        cupiditate eveniet, sapiente repellendus iusto, incidunt, voluptates
        fuga fugit! Quis in ab alias?
      </p>
      {data.description.length > 60 && (
        <button
          className="mt-3 underline text-lg uppercase font-medium"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default Heading;

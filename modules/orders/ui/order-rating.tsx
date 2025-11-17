import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

type props = {
  orderItemId: string;
  productId: string;
};

const OrderRating = ({ orderItemId, productId }: props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!rating) return alert("Please select a rating");

    const res = await fetch("/api/orders/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        orderItemId,
        rating,
        comment,
      }),
    });

    console.log(res);
    

    if (res.ok) {
      alert("Review submitted!");
      setRating(0);
      setComment("");
    } else {
      alert("Failed to submit");
    }
  };

  const fetchProductReview = async() => {
    const response = await fetch('/api/orders/review');
    const result = await response.json()
    console.log(result);
    
  }

  useEffect(() =>{
    fetchProductReview();
  } ,[])

  return (
    <section className="m-4 p-4 flex flex-col gap-y-3 bg-stone-200 rounded-md">
      <div className="flex justify-between">
        <h1 className="font-semibold">Rate your experience</h1>
        <div className="flex text-sm font-semibold border">
          <Button
            size={"sm"}
            type="button"
            className="h-3 hover:bg-transparent cursor-pointer"
            variant={"ghost"}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Separator orientation="vertical" className="bg-white max-h-6" />
          <Button
            size={"sm"}
            type="button"
            className="h-3 hover:bg-transparent cursor-pointer"
            variant={"ghost"}
            onClick={()=> {

            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="flex rounded-full mt-3 py-2.5 px-3 text-stone-200 bg-gray-900 w-fit gap-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            size={14}
            className={`cursor-pointer transition 
              ${
                (hover || rating) >= star ? "text-[#FFA534]" : "text-[#e7e5e4]"
              }`}
            fill={(hover || rating) >= star ? "#FFA534" : "#e7e5e4"}
          />
        ))}
      </div>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write description"
        className="bg-white"
      />
    </section>
  );
};

export default OrderRating;

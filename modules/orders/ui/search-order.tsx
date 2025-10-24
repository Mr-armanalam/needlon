/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  //  Debounce user input (500ms delay)
  const debouncedSearch = useDebounce(searchValue, 500);

  // Fetch orders when debounced search changes
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await fetch(`/api/orders?search=${debouncedSearch}`);
      if (res.status === 401) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();

    // Update the URL param
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    router.replace(`?${params.toString()}`);
  }, [debouncedSearch, router]);

  const onHandleSearch = () => {
    const params = new URLSearchParams();
    if (searchValue) params.set("search", searchValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="px-8">
      <div className="flex font-semibold  justify-between">
        <h1 className="text-3xl text-gray-800 font-garamond ">Your Orders</h1>
        <div className="flex gap-x-3">
          <InputGroup className="min-w-[320px]">
            <InputGroupInput
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Search orders"
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon className="text-xs" align="inline-end">
              12 results
            </InputGroupAddon>
          </InputGroup>
          <Button
            onClick={onHandleSearch}
            type="button"
            className="cursor-pointer"
          >
            Search Orders
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length ? (
          <ul className="space-y-3">
            {orders.map((o) => (
              <li key={o.orderId} className="p-3 border rounded-lg">
                <p>
                  <strong>Product:</strong> {o.productName}
                </p>
                <p>
                  <strong>Status:</strong> {o.status}
                </p>
                <p>
                  <strong>Total:</strong> ₹{o.total}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;

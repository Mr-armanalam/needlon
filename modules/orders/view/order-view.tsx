"use client";
import React, { useState } from "react";
import SearchOrder from "../ui/search-order";
import DisplayOrders from "../ui/display-orders";
import { useRouter } from "next/navigation";
import { GroupedOrder } from "@/app/api/orders/route";

type Props = {
  initialOrders: GroupedOrder[];
  initialSearch: string;
};

const OrderView = ({ initialOrders, initialSearch }: Props) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [orders] = useState(initialOrders);

  return (
    <>
      <SearchOrder
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={() => {
          const params = new URLSearchParams();
          if (searchValue) params.set("search", searchValue);
          router.push(`?${params.toString()}`);
        }}
      />
      <DisplayOrders orders={orders} loading={false} />
    </>
  );
};

export default OrderView;




// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useEffect, useState } from "react";
// import SearchOrder from "../ui/search-order";
// import DisplayOrders from "../ui/display-orders";
// import { useRouter, useSearchParams } from "next/navigation";
// import { GroupedOrder } from "@/app/api/orders/route";

// const OrderView = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
//   const [orders, setOrders] = useState<GroupedOrder[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrders = async (query?: string) => {
//     setLoading(true);
//     const res = await fetch(`/api/orders?search=${query || ""}`);
//     if (res.status === 401) {
//       setOrders([]);
//       setLoading(false);
//       return;
//     }
//     const data = await res.json();
//     setOrders(data);
//     setLoading(false);
//   };


//   useEffect(() => {
//     fetchOrders(searchValue);
//   }, []); 


//   useEffect(() => {
//     const query = searchParams.get("search") ?? "";
//     if (query) {
//       fetchOrders(query);
//     }
//   }, [searchParams]);  

//   return (
//     <>
//       <SearchOrder
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         onSearch={() => {
//           const params = new URLSearchParams();
//           if (searchValue) params.set("search", searchValue);
//           router.push(`?${params.toString()}`);
//         }}
//       />
//       <DisplayOrders orders={orders} loading={loading} />
//     </>
//   );
// };

// export default OrderView;

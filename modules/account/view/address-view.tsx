"use client";
import React, { useEffect, useState } from "react";
import AddNewAddress from "../ui/add-new-address";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { userAddress } from "@/db/schema/user-address";
import { EllipsisVertical } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getAllUserAddress } from "../server/address-controller";

const AddressView = () => {
  const [allUserAddress, setAllUserAddress] = useState<
    (typeof userAddress.$inferSelect)[]
  >([]);
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  const { data: session } = useSession();

  const onDeleteAddress = ({id,userId}:{id: string, userId: string}) => {
    if (!userId) return;
    
  }

  const onEditAddress = ({id,userId}:{id: string, userId: string}) => {
    if (!userId) return;

  }

  useEffect(() => {
    if (!session?.user.id) return; // ✅ avoid running with empty id

    let mounted = true; // ✅ handle unmount safety
    (async () => {
      const res = await getAllUserAddress(session.user.id);
      if (mounted) {
        if (res.success) {
          setAllUserAddress(res.addresses); // ✅ matches backend shape
        } else {
          toast.error(res.message ?? "Something went wrong");
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [session?.user.id, isAddressSaved]);

  return (
    <div>
      <h1 className="text-xl mb-6 text-stone-800 font-garamond font-semibold">
        Manage Address
      </h1>
      <AddNewAddress setIsAddressSaved={setIsAddressSaved} />
      <div className="mt-6">
        {allUserAddress.length === 0 ? (
          <p>No addresses found</p>
        ) : (
          <div className="border border-stone-200 rounded-xs">
            {allUserAddress.map((addr) => (
              <div
                className="border-b relative border-stone-200 rounded-xs py-5 px-8"
                key={addr.id}
              >
                <HoverCard>
                  <HoverCardTrigger className="absolute cursor-pointer right-4">
                    <EllipsisVertical size={17} className="" />
                  </HoverCardTrigger>
                  <HoverCardContent
                    align="end"
                    className="max-w-28 p-1.5 text-sm"
                  >
                    <div
                      onClick={() =>
                        onEditAddress({ id: addr.id, userId: session?.user.id ?? '' })
                      }
                      className="hover:bg-stone-100 px-2.5 cursor-pointer py-1.5 rounded"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() =>
                        onDeleteAddress({
                          id: addr.id,
                          userId: session?.user.id ?? '',
                        })
                      }
                      className="hover:bg-stone-100 cursor-pointer px-2.5 py-1.5 rounded"
                    >
                      Delete
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <p className="font-semibold mb-2">
                  {addr.name}&nbsp; &nbsp;{addr.phone}&nbsp; &nbsp;
                  {addr?.alternate_phone}
                </p>
                <p className="text-sm max-w-[500px]">
                  {addr.address}, {addr.city}, {addr.landmark}, {addr.locality},{" "}
                  {addr.state} - {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressView;

"use client";

import React, { useEffect, useState } from "react";
import AddNewAddress from "../ui/add-new-address";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { userAddress } from "@/db/schema/user-address";
import { EllipsisVertical, HomeIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import NoUserAddress from "../shared/no-user-address";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteAddress, fetchAddresses } from "@/features/address-slice";


const AddressView = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const { addresses, loading, error } = useAppSelector(
    (state) => state.addresses
  );

  const [editingAddress, setEditingAddress] = useState<
    typeof userAddress.$inferSelect | null
  >(null);
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    undefined
  );

 
  useEffect(() => {
    if (session?.user.id) {
      dispatch(fetchAddresses(session.user.id));
    }
  }, [dispatch, session?.user.id]);

  const onDeleteAddress = async (id: string) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      toast.success("Address deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address");
    }
  };

  const onEditAddress = (addr: typeof userAddress.$inferSelect) => {
    if (!session?.user.id) return;
    setAccordionValue("item-1");
    setEditingAddress(addr);
  };

  return (
    <div>
      <h1 className="text-xl mb-6 text-stone-800 font-garamond font-semibold">
        Manage Address
      </h1>

      <AddNewAddress
        accordionValue={accordionValue}
        setAccordionValue={setAccordionValue}
        editingAddress={
          editingAddress
            ? {
                name: editingAddress.name,
                phone: editingAddress.phone,
                pincode: editingAddress.pincode,
                locality: editingAddress.locality,
                address: editingAddress.address,
                city: editingAddress.city,
                state: editingAddress.state,
                id: editingAddress.id,
                landmark: editingAddress.landmark ?? "",
                alternate_phone: editingAddress.alternate_phone ?? "",
              }
            : null
        }
        clearEditing={() => setEditingAddress(null)}
      />

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-stone-500">Loading addresses...</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : addresses.length === 0 ? (
          <NoUserAddress Icon={HomeIcon} description="No address saved" />
        ) : (
          <div className="border border-stone-200 rounded-xs">
            {addresses.map((addr) => (
              <div
                className="border-b relative border-stone-200 rounded-xs py-5 px-8"
                key={addr.id}
              >
                <HoverCard>
                  <HoverCardTrigger className="absolute cursor-pointer right-4">
                    <EllipsisVertical size={17} />
                  </HoverCardTrigger>
                  <HoverCardContent
                    align="end"
                    className="max-w-28 p-1.5 text-sm"
                  >
                    <div
                      onClick={() => onEditAddress(addr)}
                      className="hover:bg-stone-100 px-2.5 cursor-pointer py-1.5 rounded"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => onDeleteAddress(addr.id)}
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
                  {addr.address}, {addr.city}, {addr.landmark},{" "}
                  {addr.locality}, {addr.state} - {addr.pincode}
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


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
import { deleteAddress, getAllUserAddress } from "../server/address-controller";
import NoUserAddress from "../shared/no-user-address";

const AddressView = () => {
  const [allUserAddress, setAllUserAddress] = useState<
    (typeof userAddress.$inferSelect)[]
  >([]);
  const [editingAddress, setEditingAddress] = useState<
    typeof userAddress.$inferSelect | null
  >(null);
  const [realTimeAddressStatus, setrealTimeAddressStatus] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    undefined
  );

  const { data: session } = useSession();

  const onDeleteAddress = async ({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }) => {
    if (!userId) return;
    const result = await deleteAddress({ id, userId });

    if (result?.success) {
      toast.success("Address is deleted successfully !");
      setrealTimeAddressStatus(true);
    } else {
      console.log(result?.error);
      toast.error("something went wrong!");
    }
  };

  const onEditAddress = (addr: typeof userAddress.$inferSelect) => {
    if (!session?.user.id) return;
    setAccordionValue("item-1");
    setEditingAddress(addr);
  };

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
  }, [session?.user.id, realTimeAddressStatus]);

  return (
    <div>
      <h1 className="text-xl mb-6 text-stone-800 font-garamond font-semibold">
        Manage Address
      </h1>
      <AddNewAddress
        setrealTimeAddressStatus={setrealTimeAddressStatus}
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
                landmark: editingAddress.landmark ?? "", // ✅ force string
                alternate_phone: editingAddress.alternate_phone ?? "", // ✅ force string
              }
            : null
        }
        clearEditing={() => setEditingAddress(null)}
      />
      <div className="mt-6">
        {allUserAddress.length === 0 ? (
          <NoUserAddress Icon={HomeIcon} description="No address saved" />
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
                      onClick={() => onEditAddress(addr)}
                      className="hover:bg-stone-100 px-2.5 cursor-pointer py-1.5 rounded"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() =>
                        onDeleteAddress({
                          id: addr.id,
                          userId: session?.user.id ?? "",
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

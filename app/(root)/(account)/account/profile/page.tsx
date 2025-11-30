import { authOptions } from "@/lib/auth-option/auth-data";
import { getPersonalinfo } from "@/modules/account/server/personal-Info-controller";
import PersonalInfo from "@/modules/account/view/personal-info";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  
  let personalData = null;
  if (userId) {
    const res = await getPersonalinfo(userId);
    personalData = res?.data ?? null;
  }

  return (
    <div className="px-8">
      {personalData && <PersonalInfo serverData={personalData} />}
    </div>
  );
};

export default page;

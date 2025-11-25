"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import NameInfo from "../components/name-info";
import GenderInfo from "../components/gender-info";
import Emailinfo from "../components/email-info";
import PhoneInfo from "../components/phone-info";
import { getPersonalinfo, registerPersonalinfo } from "../server/personal-Info-controller";

const PersonalInfo = () => {
  const { data: session } = useSession();
  const [personalData, setPersonalData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    number: "",
  });
  const [editSection, setEditSection] = useState<
    null | "personal" | "email" | "phone"
  >(null);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((previousValue) => ({ ...previousValue, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerPersonalinfo({
        ...personalData,
        userId: session?.user.id,
      });

      if (res.success) {
        toast("Data saved successfully!");
      } else {
        toast("Failed to save data");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while saving");
    } finally {
      setEditSection(null);
    }
  };

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) return;

      const fetchData = await getPersonalinfo(session.user.id);

      if (fetchData.success && fetchData.data) {
        setPersonalData({
          firstname: fetchData.data?.name?.split(" ")?.[0] ?? "",
          lastname: fetchData.data?.name?.split(" ")?.slice(1).join(" ") ?? "",
          email: fetchData.data?.email ?? "",
          number: fetchData.data?.phone ?? "",
          gender: fetchData.data.gender ?? "male",
        });
      }
    })();
  }, [session?.user?.id]);

  return (
    <form method="POST">
      {/* TODO: MAKE SECURE FORM GET URL */}
      <NameInfo
        editSection={editSection}
        setEditSection={setEditSection}
        firstname={personalData.firstname}
        lastname={personalData.lastname}
        handleOnChange={handleOnChange}
        handleSave={handleSave}
      />

      {personalData?.gender && <GenderInfo gender={personalData.gender} />}

      <Emailinfo
        editSection={editSection}
        setEditSection={setEditSection}
        email={personalData.email}
        handleOnChange={handleOnChange}
        handleSave={handleSave}
      />

      <PhoneInfo
        editSection={editSection}
        setEditSection={setEditSection}
        number={personalData.number}
        handleOnChange={handleOnChange}
        handleSave={handleSave}
      />
    </form>
  );
};

export default PersonalInfo;

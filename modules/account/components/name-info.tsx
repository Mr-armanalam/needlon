import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";


type Props = {
  editSection: null | "personal" | "email" | "phone";
  setEditSection: React.Dispatch<React.SetStateAction<null | "personal" | "email" | "phone">>;
  firstname: string;
  lastname: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (e: React.FormEvent) => void;
};


const NameInfo = ({
  editSection,
  setEditSection,
  firstname,
  lastname,
  handleOnChange,
  handleSave,
}: Props) => {
  return (
    <>
      <div className="flex mb-8 items-end gap-8">
        <p className="text-lg font-semibold text-stone-800">
          Personal Information
        </p>
        {editSection === "personal" ? (
          <button
            type="button"
            className="text-base cursor-pointer text-blue-800 font-semibold"
            onClick={() => setEditSection(null)}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="text-base cursor-pointer text-blue-800 font-semibold"
            onClick={() => setEditSection("personal")}
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex gap-6">
        <Input
          disabled={editSection !== "personal" && true}
          type="text"
          className="w-[300px] font-semibold rounded-sm h-12 mb-4"
          value={firstname}
          name="firstname"
          placeholder="First Name"
          onChange={(e) => handleOnChange(e)}
        />
        <Input
          disabled={editSection !== "personal" && true}
          type="text"
          className="w-[300px] font-semibold rounded-sm h-12 mb-4"
          value={lastname}
          name="lastname"
          placeholder="Last Name"
          onChange={(e) => handleOnChange(e)}
        />

        {editSection === "personal" && (
          <Button
            onClick={(e) => handleSave(e)}
            variant={"secondary"}
            className="h-12 w-20"
            type="submit"
          >
            {" "}
            Save
          </Button>
        )}
      </div>
    </>
  );
};

export default NameInfo;

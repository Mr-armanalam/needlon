import React, { ReactNode } from "react";

const Layout = ({
  hero_section,
  children,
  premium_section
}: {
  children: ReactNode;
  hero_section: ReactNode;
  premium_section: ReactNode;
}) => {
  return (
    <>
      {hero_section}
      {premium_section}
      <div className="bg-gray-100 flex flex-col gap-y-2 p-2">{children}</div>
    </>
  );
};

export default Layout;

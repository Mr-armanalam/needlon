import React, { ReactNode } from "react";

const Layout = ({
  hero_section,
  children,
}: {
  children: ReactNode;
  hero_section: ReactNode;
}) => {
  return (
    <>
      {hero_section}
      {children}
    </>
  );
};

export default Layout;

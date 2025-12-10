import React, { ReactNode } from "react";

const Layout = ({
  hero_section,
  children,
  premium_section,
  you_may_like_section,
  recommendation_section,
}: {
  children: ReactNode;
  hero_section: ReactNode;
  premium_section: ReactNode;
  you_may_like_section: ReactNode;
  recommendation_section: ReactNode;
}) => {
  return (
    <>
      {hero_section}
      <div className="bg-gray-100 flex flex-col gap-y-2 p-2">
        {premium_section}
        {you_may_like_section}
        {children}
        {recommendation_section}
      </div>
    </>
  );
};

export default Layout;

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

interface props {
  navigateTrigger: string;
  link: string;
  subNevigator?: subnevigator[];
}

interface subnevigator {
  name: string;
  description: string;
  link?: string;
}

const Navigationmenu = ({ navigateTrigger, subNevigator, link }: props) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {navigateTrigger === "About" ? (
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={link}>{navigateTrigger}</Link>
            </NavigationMenuLink>
          ) : (
            <>
              <NavigationMenuTrigger>{navigateTrigger}</NavigationMenuTrigger>
              <NavigationMenuContent className="w-[400px]">
                <ul className="grid w-[300px] gap-4">
                  <li>
                    {subNevigator?.map((item, index) => (
                      <NavigationMenuLink key={index} asChild>
                        <Link href={item.link || "#"}>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground">
                            {item?.description}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigationmenu;

"use client"
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export interface NavSubItem {
  id: string,
  title: string;
  href: string,  
  description: string;
}
export interface NavItem {
  id: string,
  title: string;
  img: string;
  description: string;
  sub_menus: NavSubItem[];
}

interface WdogNaviProps {
  navItems: NavItem[];
}

export default function WdogNavi({ navItems }: WdogNaviProps) {
  console.log('머가 잘못된 거지', navItems);
  return (
    <div className="flex justify-center self-start pt-6 w-full">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map(item => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className={`
                text-xl 
                transition-colors
                !hover:bg-[#3D9DF2] !hover:text-white 
                !focus:bg-[#3D9DF2] !focus:text-white 
                !data-[state=open]:bg-[#3D9DF2] !data-[state=open]:text-white 
                !data-[state=open]:hover:bg-[#3D9DF2] !data-[state=open]:hover:text-white
                ${navigationMenuTriggerStyle()}
              `}>
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150 list-none">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex gap-2 h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="#"
                        onClick={e => e.preventDefault()}
                      >
                        <img src={item.img} alt={item.title} width={300} height={400}  />
                        <p className="text-[#056CF2] text-sm leading-tight">
                          {item.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {item.sub_menus.map(sub => (
                    <ListItem href={sub.href} key={sub.id} title={sub.title}>
                      {sub.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ href, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a 
            href={href}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            ref={ref}
            {...props}
          >
            <div className="text-sm font-medium leading-none text-[#0528F2]">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

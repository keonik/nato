"use client"
import React from 'react'
import { NavItem } from '@/types'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
    item: NavItem;
}

export default function NestedNavLink({item}: Props) {
  return (
    <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='flex flex-col gap-4 p-4 w-36'>
        {item?.nested?.map(nestedItem => (
            nestedItem.href ? <Link key={nestedItem.title} href={nestedItem.href} target='_blank' className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                item.disabled && "cursor-not-allowed opacity-80",
                "hover:text-primary"
              )}>{nestedItem.title}</Link>: null
            ))}</ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
  )
}
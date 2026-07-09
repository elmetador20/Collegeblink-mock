"use client";

import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
}

interface CustomTabsProps {
  tabs?: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export type TabsProps = CustomTabsProps & React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ tabs, activeTab, onChange, className, children, ...props }, ref) => {
  if (tabs && activeTab && onChange) {
    return (
      <div className={cn("flex border-b border-[#E3DFD6] dark:border-zinc-800", className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px active:scale-95 duration-150",
              activeTab === tab.id
                ? "border-[#1F3A5C] text-[#1F3A5C] dark:border-zinc-100 dark:text-zinc-100"
                : "border-transparent text-[#6B6660] hover:text-[#1C1B19] dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

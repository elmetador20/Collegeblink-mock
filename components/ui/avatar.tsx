"use client";

import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  fallback?: string;
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, src, fallback, children, ...props }, ref) => {
  if (src || fallback) {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted",
          className
        )}
        {...props}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            className="aspect-square h-full w-full object-cover"
          />
        )}
        {fallback && (
          <AvatarPrimitive.Fallback
            className="flex h-full w-full items-center justify-center rounded-full bg-muted font-bold text-xs uppercase text-muted-foreground"
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        )}
      </AvatarPrimitive.Root>
    );
  }

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted font-bold text-xs uppercase text-muted-foreground",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

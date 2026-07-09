"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:border-border/70 group-[.toaster]:bg-card/95 group-[.toaster]:text-foreground group-[.toaster]:shadow-[0_20px_50px_rgba(7,12,26,0.3)] group-[.toaster]:backdrop-blur-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-accent group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

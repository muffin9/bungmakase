import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';
import React from 'react';

interface BottomDrawerProps {
  triggerElement: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = 'Drawer';

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/40', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed p-4 w-full max-w-[360px] inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-white',
        className,
      )}
      {...props}
    >
      <div className="mx-auto h-2 w-[100px] mb-4 rounded-full bg-accent" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

const BottomDrawer = ({
  triggerElement,
  className,
  children,
}: BottomDrawerProps) => (
  <Drawer>
    <DrawerTrigger asChild>{triggerElement}</DrawerTrigger>
    <DrawerContent className={className}>{children}</DrawerContent>
  </Drawer>
);

export { BottomDrawer, DrawerClose };

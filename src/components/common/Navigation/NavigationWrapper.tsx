'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/common/Navigation';
import { shouldShowNavigation } from '@/lib/router';

export function NavigationWrapper() {
  const pathname = usePathname();

  if (!shouldShowNavigation(pathname)) {
    return null;
  }

  return <Navigation />;
}

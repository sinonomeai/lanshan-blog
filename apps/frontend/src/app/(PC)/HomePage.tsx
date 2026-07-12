'use client';
import { PC_HeroSection } from './HeroSection';
import { PC_EndSection } from './EndSection';
import { PC_MiddleSection } from './MiddleSection';
import { useRef } from 'react';
import { useFullpageScroll } from '@/lib/use-fullpage-scroll';

export const PC_HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 启用全屏滚动
  useFullpageScroll(containerRef);

  return (
    <div
      ref={containerRef}
      className="contain
      h-screen w-full
	    flex flex-col
      overflow-y-auto
	    "
    >
      <PC_HeroSection />
      <PC_MiddleSection />
      <PC_EndSection />
    </div>
  );
};

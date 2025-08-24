'use client';

import React, { memo } from 'react';
import { UI_CONFIG } from '@/config/ui.config';

interface LayoutProps {
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
}

const Layout = memo<LayoutProps>(({ leftSide, rightSide }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8'>
      <div className={UI_CONFIG.layout.container}>
        <div className={UI_CONFIG.layout.grid}>
          {/* Left Side */}
          <div className='relative bg-white rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none border-r-0 lg:border-r-2 border-b-2 lg:border-b-0 border-slate-200'>
            {/* Clipped border decoration */}
            <div className='absolute -right-0 lg:-right-1 top-8 bottom-8 w-2 bg-white hidden lg:block'>
              <div className='absolute inset-0 border-r-2 border-slate-200'></div>
              <div className='absolute top-0 -right-1 w-4 h-4 bg-slate-100 transform rotate-45 border border-slate-200'></div>
              <div className='absolute bottom-0 -right-1 w-4 h-4 bg-slate-100 transform rotate-45 border border-slate-200'></div>
            </div>
            {/* Mobile bottom border decoration */}
            <div className='absolute -bottom-1 left-8 right-8 h-2 bg-white lg:hidden'>
              <div className='absolute inset-0 border-b-2 border-slate-200'></div>
              <div className='absolute left-0 -bottom-1 w-4 h-4 bg-slate-100 transform rotate-45 border border-slate-200'></div>
              <div className='absolute right-0 -bottom-1 w-4 h-4 bg-slate-100 transform rotate-45 border border-slate-200'></div>
            </div>
            <div className={UI_CONFIG.spacing.padding.large}>{leftSide}</div>
          </div>

          {/* Right Side */}
          <div className='bg-white rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none'>
            <div className={UI_CONFIG.spacing.padding.large}>{rightSide}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;

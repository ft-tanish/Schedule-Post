'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface LayoutProps {
  leftSide: ReactNode;
  rightSide: ReactNode;
}

export default function Layout({ leftSide, rightSide }: LayoutProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto h-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 h-full min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)]'>
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
            <div className='p-6 md:p-8 h-full'>{leftSide}</div>
          </div>

          {/* Right Side */}
          <div className='bg-white rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none'>
            <div className='p-6 md:p-8 h-full'>{rightSide}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

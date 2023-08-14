import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Table from '@/components/table';
import TablePlaceholder from '@/components/table-placeholder';
import ExpandingArrow from '@/components/expanding-arrow';
import AppointmentCalendar from '@/components/calendar-view'; // Import the calendar component

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {/* ... other content ... */}
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Postgres on Vercel
      </h1>

      {/* Include the calendar component */}
      <AppointmentCalendar />

      <Suspense fallback={<TablePlaceholder />}>
        {/* @ts-expect-error Async Server Component */}
        <Table />
      </Suspense>

      {/* ... rest of the content ... */}
    </main>
  );
}

import EventList from '@/components/events/EventList';
import { Inter } from '@next/font/google';
import { getFeaturedEvents } from '../dummy-data';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList events={featuredEvents} />
    </>
  );
}

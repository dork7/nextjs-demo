import EventList from '@/components/events/EventList';
import { Inter } from '@next/font/google';
import { getAllEvents, getFeaturedEvents } from '../dummy-data';
import EventSearch from '@/components/events/EventSearch';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const featuredEvents = getAllEvents();
  const router = useRouter();

  const findEventHandler = (month: string, year: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={featuredEvents} />
    </>
  );
}

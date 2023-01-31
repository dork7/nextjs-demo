export async function getAllEvents_API() {
  const response = await fetch(
    "https://nextjs-demo-9a278-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();
  return transformEventsData_FB(data);
}
export async function getFeaturedEvents_API() {
  const data = await getAllEvents_API();

  return data.filter((event: any) => event.isFeatured);
}

export async function getEventById_API(id: any) {
  const data = await getAllEvents_API();
  return data.find((event) => event.id === id);
}

export function transformEventsData_FB(data: any) {
  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    });
  }
  return transformedData;
}

export async function getEventPaths() {
  const events = await getFeaturedEvents_API();
  return events.map((event: any) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });
}

export async function getFilteredEvents_API(dateFilter: any) {
  const { year, month } = dateFilter;
  const events = await getAllEvents_API();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

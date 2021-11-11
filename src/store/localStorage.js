const deleteEventsInLocalStorage = () => {
  localStorage.removeItem('data');
};

const getEventsFromLocalStorage = () => {
  const events = localStorage.getItem('data');

  let parsedEvents;

  try {
    parsedEvents = JSON.parse(events);
  } catch (error) {
    console.log(error);
  }

  return parsedEvents;
};

const saveEventInLocalStorage = event => {
  const eventWithStatus = {
    ...event,
    status: 'not_validated',
  };

  const events = localStorage.getItem('data');

  let parsedEvents;
  try {
    parsedEvents = JSON.parse(events);
  } catch (error) {
    console.log(error);
  }

  if (!parsedEvents) {
    localStorage.setItem('data', JSON.stringify([eventWithStatus]));
  } else {
    localStorage.setItem('data', JSON.stringify([...parsedEvents, eventWithStatus]));
  }
};

const updateEventInLocalStorage = data => {
  const events = localStorage.getItem('data');
  
  let parsedEvents;
  try {
    parsedEvents = JSON.parse(events);
  } catch (error) {
    console.log(error);
  }

  if (parsedEvents) {
    const updatedEvents = parsedEvents.map(event => {
      if (event.createdAt == data) event.status = 'validated';
      return event;
    });
    if (updatedEvents) {
      deleteEventsInLocalStorage();
      localStorage.setItem('data', JSON.stringify(updatedEvents));
    }
  }
};

const deleteOneEventInLocalStorage = data => {
  const events = localStorage.getItem('data');
  
  let parsedEvents;
  try {
    parsedEvents = JSON.parse(events);
  } catch (error) {
    console.log(error);
  }

  if (parsedEvents) {
    const updatedEvents = parsedEvents.filter(event => event.createdAt != data);

    if (updatedEvents) {
      deleteEventsInLocalStorage();
      localStorage.setItem('data', JSON.stringify(updatedEvents));
    }
  }
};

export {
  deleteEventsInLocalStorage,
  saveEventInLocalStorage,
  getEventsFromLocalStorage,
  updateEventInLocalStorage,
  deleteOneEventInLocalStorage,
};


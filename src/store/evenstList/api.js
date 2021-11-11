import {
  deleteEventsInLocalStorage,
  saveEventInLocalStorage,
  getEventsFromLocalStorage,
  updateEventInLocalStorage,
  deleteOneEventInLocalStorage,
} from '../localStorage';

const createEvent = data => new Promise(resolve => {
  setTimeout(() => {
    saveEventInLocalStorage(data);
    resolve({ response: { data }, error: null });
  }, 500);
});

const getEvents = () => new Promise(resolve => {
  setTimeout(() => {
    const events = getEventsFromLocalStorage();
    if (events?.length > 0) {
      resolve({ response: { events }, error: null });
    } else {
      resolve({ response: { events: [] }, error: null });
    }
  }, 500);
});

const deleteEvents = () => new Promise(resolve => {
  setTimeout(() => {
    deleteEventsInLocalStorage();
    resolve({ response: { events: [] }, error: null });
  }, 500);
});

const updateEvent = data => new Promise(resolve => {
  setTimeout(() => {
    updateEventInLocalStorage(data);
    resolve({ response: { status: 200 }, error: null });
  }, 500);
});

const deleteOneEvent = data => new Promise(resolve => {
  setTimeout(() => {
    deleteOneEventInLocalStorage(data);
    resolve({ response: { status: 200 }, error: null });
  }, 500);
});

const api = {
  createEvent,
  getEvents,
  deleteEvents,
  updateEvent,
  deleteOneEvent,
};

export default api;

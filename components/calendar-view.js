import React, { useRef, useEffect } from 'react'; // Import React hooks
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import '@event-calendar/core/index.css';

const AppointmentCalendar = () => {
  // Define plugins and options
  const plugins = [TimeGrid];
  const options = {
    view: 'timeGridWeek',
    events: [
      // Your list of events (appointments) fetched from the API
    ],
  };

  // Create a reference to the target element
  const calendarRef = useRef(null);

  // Initialize the calendar on component mount
  useEffect(() => {
    if (calendarRef.current) {
      const ec = new Calendar({
        target: calendarRef.current,
        props: {
          plugins,
          options,
        },
      });
    }
  }, [calendarRef]);

  return <div id="ec" ref={calendarRef}></div>;
};

export default AppointmentCalendar;

import React, { useEffect, useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

// const events = [{
//   title: 'hbd boss',
//   start: moment().toDate(), // new Date () en moment
//   end: moment().add(2,'hour').toDate(),
//   bgcolor:'#fafafa',
//   notes: 'comprar mota',
//   user: {
//     _id: '123',
//     name:'Alexis'
//   }
// }]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();
  const {uid} = useSelector( state => state.auth );

  const {events, activeEvent} = useSelector( state => state.calendar );


  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);
  


  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));


  }

  const onViewChange = (e) =>{
    setLastView(e);
    localStorage.setItem('lastView',e);
  }

  const onSelectedSlot = (e) =>{
    dispatch(eventClearActiveEvent());
  }

  const eventStyleGetter = (event,start,end,isSelected) => {

    

    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7': '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color:'white'
    }

    return {
      style
    }
  };

  return (
    <div className='calendar-screen'>
        <Navbar/>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectedSlot}
          selectable={true}
          view={lastView}
          components={{
            event: CalendarEvent
          }}
        />
        <AddNewFab />
          {
            (activeEvent) && <DeleteEventFab/>
          }

  
        <CalendarModal/>
    </div>);
};

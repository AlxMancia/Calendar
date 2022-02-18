import { types } from "../types/types";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = ( event ) =>{
    return async( dispatch, getState ) =>{

        const { uid, name } = getState().auth;
        
       try {
            const resp = await fetchConToken('events',event,'POST');
            const body = await resp.json();


            if(body.ok){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event));
            }


       } catch (error) {
           console.log(error);
       }

    }
}

const eventAddNew = (event) =>({
    type:types.eventAddNew,
    payload: event
})


export const eventSetActive = (event) =>({
    type:types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () =>({
    type:types.eventClearActiveEvent
})

export const eventStartUpdate = (event) =>{
    return async(dispatch)=>{

        try {

            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdate(event));
            }else{
                Swal.fire('Error','Error en actualizar','error');
            }


        } catch (error) {
            
        }

    }
}

const eventUpdate = (event) =>({
    type:types.eventUpdate,
    payload:event
})

export const eventStartDelete = () =>{
    return async(dispatch, getState) =>{

        const { id } = getState().calendar.activeEvent;

        try {

            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDelete());
            }else{
                Swal.fire('Error','Error en borrar','error');
            }


        } catch (error) {
            
        }

    }
}

const eventDelete = () =>({
    type: types.eventDeleted
})

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepareEvents( body.events);

            // console.log(events)
            dispatch(eventLoaded(events));
            
        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const startEventLogout = () =>{
    return (dispatch) =>{
        dispatch(eventLogout());
    }
}


const eventLogout = ()=>({ type: types.eventLogout })
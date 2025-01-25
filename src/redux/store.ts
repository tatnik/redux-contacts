import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {contactsReducer,  ContactsState } from './contacts/reducer';


export interface RootReducer {
  contacts: ContactsState;
}


const rootReducer = combineReducers<RootReducer>({
  contacts: contactsReducer,
});

//export type RootState = ReturnType<typeof rootReducer>;

export type RootState = {
   contacts: ContactsState;
};

export const store = createStore(rootReducer, applyMiddleware(thunk));


export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

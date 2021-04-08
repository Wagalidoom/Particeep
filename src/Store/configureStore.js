import { createStore } from 'redux';
import manageFilm from './Reducers/filmReducer';

export default createStore(manageFilm);
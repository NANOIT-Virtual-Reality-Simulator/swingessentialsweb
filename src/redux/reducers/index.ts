import { combineReducers } from 'redux';
// import { CHANGE_PAGE_TITLE, CHANGE_COLOR_FORMAT, TOGGLE_DRAWER } from '../actions';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';
// import { AppActions } from '../actions/actionTypes';
import { AuthReducer } from './authentication';
import { AppState } from '../../__types__';
import { GeneralReducer } from './general';
import { UserDataReducer } from './userData';
import { BlogsReducer } from './blogs';
import { TipsReducer } from './tips';
import { ProsReducer } from './pros';

export const rootReducer = (): any =>
    combineReducers<AppState>({
        app: GeneralReducer,
        auth: AuthReducer,
        user: UserDataReducer,
        blogs: BlogsReducer,
        tips: TipsReducer,
        pros: ProsReducer,
    });
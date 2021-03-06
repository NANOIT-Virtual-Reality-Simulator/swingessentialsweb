import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';

import { loadTips } from './tip-actions';
import { loadBlogs } from './blog-actions';
import { setToken } from './auth-actions';
import { loadPros } from './pro-actions';
import { loadPackages } from './package-actions';
import { loadDiscounts } from './discount-actions';

import { ASYNC_PREFIX } from '../../constants';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

export function loadTestimonials() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_TESTIMONIALS.REQUEST });

        HttpRequest.get(ACTIONS.GET_TESTIMONIALS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_TESTIMONIALS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_TESTIMONIALS.FAILURE, response, 'LoadTestimonials'));
            })
            .request();
    };
}

export function loadInitialData(): Function {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        const token = localStorage.getItem(`${ASYNC_PREFIX}token`);
        if (token) dispatch(setToken(token));

        dispatch({ type: ACTIONS.INITIAL_LOAD });
        dispatch(loadTestimonials());
        dispatch(loadTips());
        dispatch(loadBlogs());
        dispatch(loadPros());
        dispatch(loadPackages());
        dispatch(loadDiscounts());
    };
}

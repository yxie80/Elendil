import axios from 'axios';
import { ANSWERS_FETCHED, GET_ERRORS } from './types';

export const createAnswer = (newAnswer, history) => dispatch => {
    axios
        .post('/api/answers/create', newAnswer)
        .then(res => axios
            .get(`/api/answers/of/${newAnswer.qid}`)
            .then(res =>
                dispatch({
                    type: ANSWERS_FETCHED,
                    payload: res.data,
                })
            ))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getAnswers = qid => dispatch => {
    axios
        .get(`/api/answers/of/${qid}`)
        .then(res =>
            dispatch({
                qid,
                type: ANSWERS_FETCHED,
                payload: res.data,
            })
        )
        .catch(err =>
            dispatch({
                type: ANSWERS_FETCHED,
                payload: [],
            }),
        );
};

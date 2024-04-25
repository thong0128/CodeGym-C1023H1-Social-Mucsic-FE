import actionTypes from "./actionTypes";
import * as apis from '../../apis'
import {useEffect} from "react";
import axios from "axios";

export const getHome = () => async (dispatch) => {
    try {
        const response = await apis.getHome();
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: response.data
        })

    } catch (err) {
        console.log(err);
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null
        })
    }
}

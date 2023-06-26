import {ERROR, LOADING, SET_AGENT_DETAIL, SUCCESS} from "./types";
import {getAgentDetail} from "../../../storage/getAuthAsyncStorage";

const TAG: string = 'ViewMoreScreenAction :';

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to set loading.
 * @param data boolean true/ false
 * @returns {{payload: boolean, type: string}}
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to set error.
 * @param data error data.
 * @returns {{payload: *, type: string}}
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to set success.
 * @param data dashboard api response data
 * @returns {{payload: *, type: string}}
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to set agent details.
 * @param data agent details.
 * @returns {{payload: any, type: any}}
 */
export const setAgentDetail = (data: any) => ({
    type: SET_AGENT_DETAIL,
    payload: data
});


//async function use redux-thunk
/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to fetch view more screen data.
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchViewMoreScreenData = (): void => async (dispatch) => {
    await dispatch(loading(true));
    await getAgentDetail().then(async (agentDetail: any) =>
            await dispatch(setAgentDetail(agentDetail))
    ).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

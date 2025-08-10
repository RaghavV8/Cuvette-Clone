import axios from "axios";
import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS } from "../constants/jobconstant";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const jobLoadAction = (pageNumber, keyword = "", cat = "", location = "") => async (dispatch) => {
dispatch({ type: JOB_LOAD_REQUEST });
try {
const { data } = await axios.get(
`${API_BASE}/api/jobs/show?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`,
{ withCredentials: true }
);
dispatch({ type: JOB_LOAD_SUCCESS, payload: data });
} catch (error) {
dispatch({
type: JOB_LOAD_FAIL,
payload: error?.response?.data?.error || error.message || "Failed to load jobs",
});
}
};
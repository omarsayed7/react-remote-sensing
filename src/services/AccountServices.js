import API from "./APIs";
import { makeRequest } from "../util";

export async function signInService(signin_data) {
    console.log(signin_data)
    const res = await makeRequest(`${API.SEGMENTATION_API_URL}`, {
        method: "POST",
        body: JSON.stringify(signin_data),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
    });
    return res
}
export async function signUpService(signup_data) {
    console.log(signup_data)
    const res = await makeRequest(`${API.SIGN_UP}`, {
        method: "POST",
        body: JSON.stringify(signup_data),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
    });
    return res
}
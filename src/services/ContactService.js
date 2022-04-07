import API from "./APIs";
import { makeRequest } from "../util";


export async function contactUsService(contact_us_data) {
    console.log(contact_us_data)
    const res = await makeRequest(`${API.CONTACT_US}`, {
        method: "POST",
        body: JSON.stringify(contact_us_data),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"

        },
    });
    return res;
}
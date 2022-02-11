import API from "./APIs";
import { makeRequest } from "../util";

export async function fetchSegmentationMask() {
    const res = await makeRequest(`${API.SEGMENTATION_API_URL}/`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    });
    return res;
}
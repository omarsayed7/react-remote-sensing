import API from "./APIs";
import { makeRequest } from "../util";

export async function segmentation(seg_model) {
    const res = await makeRequest(API.SEGMENTATION_API_URL, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
    });
    return res;
}

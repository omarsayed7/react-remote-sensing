import API from "./APIs";
import { makeRequest } from "../util";

export async function segmentation(seg_model) {
    console.log(seg_model)
    const res = await makeRequest(`${API.SEGMENTATION_API_URL}`, {
        method: "POST",
        body: JSON.stringify(seg_model),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
    });
    return res
}
export async function upload_Segmentation(seg_model) {
    console.log(seg_model)
    const res = await makeRequest(`${API.UPLOAD_SEGMENTATION_API_URL}`, {
        method: "POST",
        body: JSON.stringify(seg_model),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
    });
    return res
}

export async function Upload(formData) {
    console.log(formData)
    const res = await makeRequest(`${API.UPLOAD_FILE}`, {
        method: "POST",
        body: formData,
        headers: {
            "Access-Control-Allow-Origin": "*"

        },
    });
    return res;
}

export async function Archive(formData) {
    console.log(formData)
    const res = await makeRequest(`${API.ARCHIVE}`, {
        method: "POST",
        body: formData,
        headers: {
            "Access-Control-Allow-Origin": "*"

        },
    });
    return res;
}
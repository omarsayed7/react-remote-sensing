import API from "./APIs";
import axios from "axios";

export async function fetchSegmentationMask() {
    let URL = `${API.SEGMENTATION_API_URL}`;
    console.log(URL)
    return await axios({
        method: "get",
        url: URL,
        config: {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-Type": "image/jpeg",
            },
        },
    }).catch(function (err) {
        return err;
    })
}

export async function fetchUploadSegmentationMask() {
    let URL = `${API.UPLOAD_SEGMENTATION_API_URL}`;
    console.log(URL)
    return await axios({
        method: "get",
        url: URL,
        config: {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-Type": "image/jpeg",
            },
        },
    }).catch(function (err) {
        return err;
    })
}

export async function fetchSegmentationBoundingMask() {
    let URL = `${API.UPLOAD_FILE}`;
    console.log(URL)
    return await axios({
        method: "get",
        url: URL,
        config: {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-Type": "application/json",
            },
        },
    }).catch(function (err) {
        return err;
    })
}
export async function fetchArchiveImage() {
    let URL = `${API.ARCHIVE}`;
    console.log(URL)
    return await axios({
        method: "get",
        url: URL,
        config: {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-Type": "image/jpeg",
            },
        },
    }).catch(function (err) {
        return err;
    })
}

// .then(response => Buffer.from(response.data, 'binary').toString('base64'));
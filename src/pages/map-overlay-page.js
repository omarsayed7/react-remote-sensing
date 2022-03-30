import React, { Component } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import Modal from '@mui/material/Modal';
import { fetchArchiveImage, fetchSegmentationMask, fetchUploadSegmentationMask } from '../services'

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

//

export class MapOverlayPage extends Component {
    // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            maskImage: '',
            bounds: []
        }
    }
    async componentDidMount() {
        const selectedType = localStorage.getItem("selectedType")
        console.log("[INFO]", selectedType)
        if (selectedType == "addArea") {
            const segmentationMask = await fetchSegmentationMask();
            console.log("HERE:", segmentationMask)
            const maskURL = segmentationMask.request.responseURL
            console.log("HERE222:", maskURL)
            // create an image
            this.setState({ maskImage: maskURL })
        }
        else if (selectedType == "upload") {
            const segmentationUploadMask = await fetchUploadSegmentationMask();
            console.log("2HERE:", segmentationUploadMask)
            const maskUploadURL = segmentationUploadMask.request.responseURL
            console.log("2HERE222:", maskUploadURL)
            // create an image
            this.setState({ maskImage: maskUploadURL })
        }
        else if (selectedType == "archive") {
            const archiveMask = await fetchArchiveImage();
            console.log("2HERE:", archiveMask)
            const archiveURL = archiveMask.request.responseURL
            console.log("2HERE222:", archiveURL)
            // create an image
            this.setState({ maskImage: archiveURL })
        } else
            console.log("please select type")
    }

    render() {
        const bBox = localStorage.getItem('Bbox').split("[")[1].split(']')[0].split(',')
        const col_matrix = localStorage.getItem('Col_Matrix')
        const BboxBounds = [[parseFloat(bBox[1]), parseFloat(bBox[0])], [parseFloat(bBox[3]), parseFloat(bBox[2])]]
        console.log(this.state, BboxBounds, "STATE")
        console.log(this.state.maskImage, "URL")
        return (
            <MapContainer center={[parseFloat(bBox[1]), parseFloat(bBox[0])]} zoom={13} zoomControl={false} style={{ height: "90vh" }} >
                <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
                <ImageOverlay
                    bounds={BboxBounds}
                    url={this.state.maskImage}
                    opacity={0.5}
                />
            </MapContainer>
        );
    }
}


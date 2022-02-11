import React, { Component } from 'react';
import { MapContainer, TileLayer, FeatureGroup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import download from "downloadjs";
import { fetchSegmentationMask } from '../services'

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
            maskImage: ''
        }
    }
    async componentDidMount() {
        const segmentationMask = await fetchSegmentationMask();
        // convert to Base64
        var b64Response = segmentationMask
        // create an image
        // var outputImg = document.createElement('img');
        // outputImg.src = 'data:image/png;base64,' + b64Response;
        download(b64Response, "test.jpg", "image/jpeg")
        // this.setState({ maskImage: segmentationMask.data })
    }
    render() {
        console.log(this.state.maskImage)
        return (
            <MapContainer center={[37.8189, -122.4786]} zoom={13} zoomControl={false} style={{ height: "90vh" }} >
                <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
                <ImageOverlay bounds={[

                    [37.804205972185315, -122.46813154233679],
                    [37.80581300358448, -122.4655394551519],
                ]
                }
                    url={this.state.maskImage}
                    opacity={0.5}
                />
                {/* <FeatureGroup
                // ref={(reactFGref) => {
                //     this._onFeatureGroupReady(reactFGref);
                // }}
                >
                    <EditControl
                        draw={{
                            rectangle: false,
                            circle: false,
                            polygon: false,
                            polyline: false,
                            circlemarker: false,
                            marker: false,
                        }}
                    />
                </FeatureGroup> */}
            </MapContainer>
        );
    }
}


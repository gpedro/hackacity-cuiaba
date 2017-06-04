import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import './XablauMap.css';
import radares from '../../data/radares.json';

class XablauMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            center: [-15.5989,-56.0949],
            zoom: 14
        }
    }

    markerClick(center) {
        this.refs.map.leafletElement.setView(center)
    }

    render() {
        return (
            <div className="fullscreenMap">
                <Map ref="map" animate center={this.state.center} zoom={this.state.zoom} maxZoom={18} style={{ height: '100%' }}>
                        <MarkerClusterGroup wrapperOptions={{enableDefaultStyle: true}}>
                        {radares.map((radar, index) => {
                            const position = [radar.latitude, radar.longitude]
                            return <Marker key={index} position={position} onClick={() => this.markerClick(position)}>
                                <Popup><span>{radar.nome}</span></Popup>
                            </Marker>
                        })}
                    </MarkerClusterGroup>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
            </div>
        )
    }

}

export default XablauMap;
import React, { Component } from 'react';
import { Map, Marker, FeatureGroup, LayersControl, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import DivIcon from 'react-leaflet-div-icon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Slider, { Range } from 'rc-slider';
import Loading from '../shared/Loading';
import radares from '../../data/radares.json';
import acidentes from '../../data/acidentes_mes_ano.json';
import _ from 'lodash';

import 'rc-slider/assets/index.css';
import './XablauMap.css';

let steps = [];
let acidentesMesAno = [];
Object.keys(acidentes).forEach(key => {
    const value = acidentes[key]
    const position = JSON.parse(key);
    const month = _.padStart(('' + position[0]), 2, '0');
    const year = position[1];
    const pair = month + ' - ' + year; 
    steps[pair] = {
        month: month,
        year: year,
    };

    acidentesMesAno.push({
        value, position
    })
})

steps = _.sortBy(_.values(steps), ['year', 'month'])
let stepLabels = steps.map(item => {
    return item.month + "/" + (item.year + "").substr(2, 2); 
})

class XablauMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            center: [-15.5989,-56.0949],
            zoom: 14,
            heatmap: []
        }
    }

    markerClick(center) {
        this.refs.map.leafletElement.setView(center)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
            this.onChange([0, steps.length-1])
        }, 1000)
    }

    onChange(event) {
        const min = steps[event[0]]
        const max = steps[event[1]]
        const heatmap = acidentesMesAno.filter(item => {
            const current = new Date(item.position[1], item.position[0], 1)
            const minDt = new Date(min.year, min.month, 1)
            const maxDt = new Date(max.year, max.month, 31)
            return (current.getTime() >= minDt.getTime()) && (current.getTime() <= maxDt.getTime());
        })

        this.setState({ heatmap: heatmap })
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        return (
            <div className="fullscreenMap">
                <Map ref="map" animate center={this.state.center} zoom={this.state.zoom} maxZoom={18} style={{ height: '100%' }}>
                    <LayersControl position='topright'>
                        <LayersControl.BaseLayer checked name='OpenStreetMap.Mapnik'>
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            />
                        </LayersControl.BaseLayer>
                        <HeatmapLayer
                            points={this.state.heatmap}
                            longitudeExtractor={m => m.position[3]}
                            latitudeExtractor={m => m.position[2]}
                            intensityExtractor={m => m.value * 5} />
                        <LayersControl.Overlay checked name='Radares'>
                            <FeatureGroup >{radares.map((radar, index) => {
                                const position = [radar.latitude, radar.longitude]
                                return <DivIcon position={position} iconAnchor={[-63, 0]}>
                                    <img src={require('./images/fiscal_eletronic.png')} style={{ width: 24, position: 'relative', top: '-32px', right: '5px' }}/>
                                </DivIcon>//<Marker key={index} position={position} onClick={() => this.markerClick(position)} />
                            })}</FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </Map>
                <Card style={{ position: 'absolute', zIndex: 9000, bottom: 0, right:0, left: 0, marginRight: 15, marginLeft: 15 }}>
                    <CardHeader
                        title="Filtros"
                        subtitle="Veja a serie histórica dos dados" />
                    
                    <div style={{ marginRight: 20, marginLeft: 20, marginBottom: 40 }}>
                        <Range min={0} marks={stepLabels} defaultValue={[0, steps.length-1]} max={steps.length-1} step={1} onAfterChange={(event) => this.onChange(event)} />
                    </div>
                </Card>
            </div>
        )
    }

}

export default XablauMap;
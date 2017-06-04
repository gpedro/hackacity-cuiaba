import React, { Component } from 'react';
import { Map, FeatureGroup, LayersControl, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import DivIcon from 'react-leaflet-div-icon';
import Control from 'react-leaflet-control';
import {Card, CardHeader } from 'material-ui/Card';
import { Range } from 'rc-slider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Loading from '../shared/Loading';
import { getInfracoesPorTipoVeiculo } from './InfracoesService';
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
            open: false,
            center: [-15.5989,-56.0949],
            zoom: 14,
            heatmap: [],
            steps: [],
            radarInfo: {},
        }
    }

    markerClick(radar) {
        const center = [radar.latitude, radar.longitude]
        this.refs.map.leafletElement.setView(center)

        // open drawer
        this.setState({ open: true, radarInfo: {} })
        const step = this.state.steps;
        const inicio = steps[step[0]];
        const fim = steps[step[1]];

        getInfracoesPorTipoVeiculo(radar.nome, (inicio.month+"-"+inicio.year), (fim.month+"-"+fim.year)).then(response => {
            this.setState({ radarInfo: response })
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
            this.onChange([0, steps.length-1])
        }, 1000)
    }

    onChange(event) {
        this.setState({ steps: event })
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

    handleClose = () => this.setState({open: false});

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        const gradientColors = {
            '0.5': 'blue',
            '0.7': 'orange',
            '1.0': 'red',
        };

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
                            intensityExtractor={m => m.value * 5}
                            gradient={gradientColors}/>
                        <LayersControl.Overlay checked name='Radares'>
                            <FeatureGroup>
                                {radares.map((radar, index) => {
                                const position = [radar.latitude, radar.longitude]
                                return <DivIcon position={position} key={radar.nome}onClick={() => this.markerClick(radar)}>
                                    <img src={require('./images/fiscal_eletronic.png')} alt={'icon xablau'} style={{ width: 24, position: 'relative', top: '-32px', right: '5px' }}/>
                                </DivIcon>
                                })}
                            </FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl>

                    <Control position="bottomright">
                        <div>XABLAU</div>
                    </Control>
                </Map>
                <Card style={{ position: 'absolute', zIndex: 9000, bottom: 0, right:0, left: 0, marginRight: 15, marginLeft: 15 }}>
                    <CardHeader
                        title="Filtros"
                        subtitle="Veja a serie histórica dos dados" />
                    
                    <div style={{ marginRight: 20, marginLeft: 20, marginBottom: 40 }}>
                        <Range min={0} marks={stepLabels} defaultValue={[0, steps.length-1]} max={steps.length-1} step={1} onAfterChange={(event) => this.onChange(event)} />
                    </div>
                </Card>

                <Drawer openSecondary open={this.state.open} >
                    <AppBar title={'Estatistícas'} onLeftIconButtonTouchTap={() => this.handleClose()} />
                    <Card>
                        <div>{Object.keys(this.state.radarInfo).map(item => {
                            return <MenuItem primaryText={item} rightIcon={<strong style={{'font-size': 12, 'line-height': 24}}>{ (this.state.radarInfo[item] || 0 )}</strong>} />
                        })}</div>
                    </Card>
                </Drawer>
            </div>
        )
    }

}

export default XablauMap;
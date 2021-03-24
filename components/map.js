import React from "react";
import { useState } from 'react';
import ReactMapGL, {GeolocateControl} from 'react-map-gl';
import Marker from './marker'

const geolocateControlStyle = { right: 10, top: 10 };

export default ({ context }) => {

	
  return (
	<>
	<ReactMapGL
	  {...context.viewport}
	  width="100vw"
	  height="100vh"
	  mapboxApiAccessToken="pk.eyJ1Ijoibmljb2QtIiwiYSI6ImNrbW5vYzNoYjF3bHYycGs1YnlzZjY3NGkifQ.U5MpZQfP0-ASUqFwc1bdvg"
	  onViewportChange={(viewport) => context.setViewport(viewport)}
	  mapStyle="mapbox://styles/mapbox/streets-v9"
	>
	  <GeolocateControl
		style={geolocateControlStyle}
		positionOptions={{enableHighAccuracy: true}}
		trackUserLocation={false}
		auto={true}
	  />
	  
	  {context.data && context.data.map(station => <Marker station={station} />)}
	  
	</ReactMapGL>
	</>
  );
}
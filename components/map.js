import React from "react";
import { useState, useRef, useEffect } from 'react';
import ReactMapGL, {GeolocateControl, NavigationControl} from 'react-map-gl';
import Marker from './marker'

const geolocateControlStyle = { right: 10, top: 10 };

export default function Map({ context }) {

	const mapRef = useRef();

	const [stations, setStations] = useState(null)
	let stationsHash = stations?.reduce((res, s) => res += s.id, '')
	
	useEffect(() => {
		const bounds = mapRef.current?.getMap().getBounds().toArray().flat() || [0,0,0,0];
		
		setStations(context.data?.filter(s => 
			s.long >= bounds[0] && s.long <= bounds[2] &&
			s.lat >= bounds[1] && s.lat <= bounds[3]
		))
	}, [context.viewport, context.data])
	
	const markers = React.useMemo(() => stations?.map(station => <Marker context={context} station={station} key={station.id}/>), [stationsHash]);
	
  return (
		<>
			<ReactMapGL
			  {...context.viewport}
			  width="100vw"
			  height="100vh"
			  mapboxApiAccessToken="pk.eyJ1Ijoibmljb2QtIiwiYSI6ImNrbW5vYzNoYjF3bHYycGs1YnlzZjY3NGkifQ.U5MpZQfP0-ASUqFwc1bdvg"
			  onViewportChange={(viewport) => { context.setViewport(viewport) }}
			  mapStyle="mapbox://styles/mapbox/streets-v9?optimize=true"
				ref={mapRef}
			> 
			  {markers}
			  
				<GeolocateControl
					style={geolocateControlStyle}
					positionOptions={{enableHighAccuracy: true}}
					trackUserLocation={false}
					auto={true}
				/>
				<NavigationControl style={{bottom: 30, right: 10}} />
			</ReactMapGL>
		</>
  );
}
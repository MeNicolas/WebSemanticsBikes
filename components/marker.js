import React, { useState } from 'react'
import style from './marker.module.css'
import ReactMapGL, {Popup, Marker} from 'react-map-gl';

export default ({ station }) => {
	
	const [showPopup, togglePopup] = React.useState(false);
	
	return (
		<>
			<Marker latitude={station.lat} longitude={station.long}>
				<div className={style.stationMarker} onMouseEnter={() => togglePopup(true)} onMouseLeave={() => togglePopup(false)}></div>
		  </Marker>
			
			{showPopup && <Popup
				latitude={station.lat}
				longitude={station.long}
				offsetLeft={20}
				offsetTop={43}
				closeButton={true}
				closeOnClick={true}
				onClose={() => togglePopup(false)}
				anchor="top"
				className={style.stationTooltip} >
				<h3>{station.name}</h3>
				<p>Vélos: {station.availableBikes}</p>
				<p>Places: {station.availableDocks}</p>
			</Popup>}
		</>
	)
}
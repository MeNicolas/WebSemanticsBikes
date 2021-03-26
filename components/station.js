import React, { useState } from 'react'
import style from './panel.module.css'
import { GrBike } from "react-icons/gr";
import { FaParking } from "react-icons/fa";

export default function Station({ station, context }) {
	
	const onSelect = () => {
		context.setViewport({
			latitude: station.lat,
			longitude: station.long,
			zoom: 15
		})
	}
	
	return (
		<li onClick={onSelect}>
			<h1>{station.name}</h1>
			{context.searchMode == 'bike' && <span><GrBike size="1.4em" style={{marginRight: 4, marginTop: -4}}/> {station.availableBikes} vélos</span> }
			{context.searchMode == 'dock' && <span><FaParking size="1.4em" style={{marginRight: 4, marginTop: -4}}/> {station.availableDocks} places</span> }
			{station.distance && <span className={style.distance}>{station.distance}m</span>}
		</li>
	)
};
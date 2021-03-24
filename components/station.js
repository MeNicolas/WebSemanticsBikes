import React, { useState } from 'react'
import style from './panel.module.css'

export default ({ station, context }) => {
	
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
			{context.searchMode == 'bike' && <span>{station.availableBikes} vélos</span> }
			{context.searchMode == 'dock' && <span>{station.availableDocks} places</span> }
			{station.distance && <span className={style.distance}>{station.distance}m</span>}
		</li>
	)
}
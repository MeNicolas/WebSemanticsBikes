import React from 'react'
import style from './marker.module.css'
import {Popup, Marker} from 'react-map-gl';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GrBike } from "react-icons/gr";
import { FaParking } from "react-icons/fa";

import { FaMapMarker } from "react-icons/fa";

export default function AppMarker({ context, station }) {
	
	const [showPopup, togglePopup] = React.useState(false);
	
	React.useEffect(() => {
		console.log('marker')
	}, [])

		return (
		<>
		  <Marker latitude={station.lat} longitude={station.long}>
				{context.viewport.zoom <= 13 ?
						<FaMapMarker color='#2684FF' />
					:
						<div style={{ width: 40, height: 40 }} onMouseEnter={() => togglePopup(true)} onMouseLeave={() => togglePopup(false)}>
							<CircularProgressbar
								value={66}
								text={context.searchMode == 'bike' ? station.availableBikes : station.availableDocks}
								background={true}
								strokeWidth={12}
								styles={buildStyles({
									textSize: '30px',
									backgroundColor: '#fff',
									pathColor: '#2684FF',
									trailColor: '#fff'
								})}
							/>
						</div>
						
				}
		  </Marker>
			
			{showPopup && <Popup
				latitude={station.lat}
				longitude={station.long}
				offsetLeft={20}
				offsetTop={46}
				tipSize={0}
				closeButton={false}
				onClose={() => togglePopup(false)}
				anchor="top"
				className={style.stationTooltip} >
					<span className={style.stationName}>{station.name}</span>
					<span className={style.info}><GrBike size="1.4em" style={{marginRight: 4, marginTop: -4}}/> {station.availableBikes} vélos</span>
					<span className={style.info}><FaParking size="1.4em" style={{marginRight: 4, marginTop: -4}}/> {station.availableDocks} places</span>
			</Popup>}
		</>
	)
}
import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Station from './station'
import Select from 'react-select'
import style from './panel.module.css'
import { getDistance } from 'geolib';
import { FaChevronDown, FaBars } from "react-icons/fa";

export default function Panel({ context }) {
	
	const options = [
		{ value: 'paris', label: 'Paris' },
		{ value: 'lyon', label: 'Lyon' },
		{ value: 'stetienne', label: 'St Etienne' }
	]
	
	return (
		<>
			<div className={`${style.panel} ${context.showPanel ? style.opened : ''}`}>
				<Row>
					<div class={style.select}>
						<Select options={options} defaultValue={options[0]} onChange={value => context.setCity(value.value)} />
					</div>
					<div className={style.close} onClick={() => context.setShowPanel(false)}>
						<FaChevronDown size="1.5em" />
					</div>
				</Row>
				<Row>
					<Col> 
						<button className={`${style.searchMode} ${context.searchMode == 'bike' ? style.selected : ''}`} onClick={() => context.setSearchMode('bike')}>
							Je cherche un vélo
						</button>
					</Col>
					<Col>
						<button className={`${style.searchMode} ${context.searchMode == 'dock' ? style.selected : ''}`} onClick={() => context.setSearchMode('dock')}>
							Je cherche une place
						</button>
					</Col>
				</Row>
				
				<ul className={style.stationsList}>
					{context.data && context.data.map(station => <Station context={context} station={station} key={station.id}/>)}
				</ul>
			</div>
			
			<div className={`${style.panelToggle} ${context.showPanel ? style.opened : ''}`} onClick={() => context.setShowPanel(true)}>
				<FaBars size="1.5em" />
			</div>
		</>
	)
};
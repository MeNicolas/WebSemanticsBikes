import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Station from './station'
import Select from 'react-select'
import style from './panel.module.css'
import { getDistance } from 'geolib';

export default ({ context }) => {
	
	const options = [
		{ value: 'paris', label: 'Paris' },
		{ value: 'lyon', label: 'Lyon' },
		{ value: 'stetienne', label: 'St Etienne' }
	]
	
	return (
		<div className={style.panel}>
			<Select options={options} defaultValue={options[0]} onChange={value => context.setCity(value.value)} /><br/>
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
				{context.data && context.data.map(station => <Station context={context} station={station}/>)}
			</ul>
		</div>
	)
}
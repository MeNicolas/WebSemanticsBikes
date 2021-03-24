import { query } from '../../../lib/sparql'
import { getDistance } from 'geolib';

export default async (req, res) => {
	const city = req.query.city || 'paris'
	let min_docks = parseInt(req.query.min_docks) || 0
	let min_bikes = parseInt(req.query.min_bikes) || 0
	let location = req.query.location?.split(',').map(parseFloat)
	const mode = req.query.mode
	
	if (mode == 'bike') min_bikes = 1
	else if (mode == 'dock') min_docks = 1
	
	let r = await query(`
		PREFIX velo: <http://velo.fr/>
		PREFIX city: <http://velo.fr/${city}/>
		PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
		SELECT *
		WHERE {
		  ?id velo:name ?name .
		  ?id velo:availableDocks ?availableDocks .
		  ?id velo:availableBikes ?availableBikes .
		  ?id geo:lat ?lat .
		  ?id geo:long ?long .
		  FILTER(
			  isUri(?id) && STRSTARTS(STR(?id), STR(city:)) &&
			  ?availableDocks >= ${min_docks} &&
			  ?availableBikes >= ${min_bikes}
		  )
		}
	`)
	
	if (location) {
		r.forEach(s => {
			s.distance = getDistance({latitude: s.lat, longitude: s.long}, {latitude: location[0], longitude: location[1]})
		})
		r.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
	}
	
	res.status(200).json(r)
}
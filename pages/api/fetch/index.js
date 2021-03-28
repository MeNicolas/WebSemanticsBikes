const fs = require('fs')
const axios = require('axios')
const jsonld = require('jsonld')

import lyon from './contexts/lyon'
import velib_live from './contexts/velib_live'
import velib_coordinates from './contexts/velib_coordinates'
import st_etienne_live from './contexts/st_etienne_live'
import st_etienne_coordinates from './contexts/st_etienne_coordinates'
import bikes_owl from './contexts/bikes_owl'

let fetchWithContext = async (url, context, keyPath = a => a) => {
	try {
		//const context = JSON.parse(fs.readFileSync(contextFile, 'utf8'))
		
		let res = await axios.get(url)
		res = keyPath(res)
		
		res.forEach(s => {
			s['@context'] = context
			s['@type'] = 'Station'
		})
		
		return await jsonld.toRDF(res, {format: 'application/n-quads'})
	} catch (error) {
		console.error(error);
	}
}

let apis = [
	{
		url: "https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json",
		context: velib_live,
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json",
		context: velib_coordinates,
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://saint-etienne-gbfs.klervi.net/gbfs/en/station_status.json",
		context: st_etienne_live,
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://saint-etienne-gbfs.klervi.net/gbfs/en/station_information.json",
		context: st_etienne_coordinates,
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=1.1.0&outputformat=GEOJSON&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn:ogc:def:crs:EPSG::4171",
		context: lyon,
		keyPath: res => res.data.features
	}
]

export default async (req, res) => {
		Promise.all(apis.map(api => fetchWithContext(api.url, api.context, api.keyPath))).then(rdf => {
		let file = rdf.join('') + bikes_owl
		
		axios.put('http://3e9d6273-7b1f-4939-b36c-b3b902c181d0.pub.instances.scw.cloud:3030/bikes/data', file, {
			auth: {
			  username: 'admin',
			  password: 'hULZKH3ZLYEu6LL'
			},
			headers: {
				"Content-Type": "text/n3"
			}
		})
			.then(r => {
				res.status(200).json(r.data)
			}).catch(error => {
				res.status(200).json(error)
			})
	})
}
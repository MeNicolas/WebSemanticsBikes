const fs = require('fs')
const axios = require('axios')
const jsonld = require('jsonld')

let fetchWithContext = async (url, contextFile, keyPath = a => a) => {
	try {
		const context = JSON.parse(fs.readFileSync(contextFile, 'utf8'))
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
		context: 'contexts/velib_live.json',
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json",
		context: 'contexts/velib_coordinates.json',
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://saint-etienne-gbfs.klervi.net/gbfs/en/station_status.json",
		context: 'contexts/st_etienne_live.json',
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://saint-etienne-gbfs.klervi.net/gbfs/en/station_information.json",
		context: 'contexts/st_etienne_coordinates.json',
		keyPath: res => res.data.data.stations
	},
	{
		url: "https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=1.1.0&outputformat=GEOJSON&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn:ogc:def:crs:EPSG::4171",
		context: 'contexts/lyon.json',
		keyPath: res => res.data.features
	}
]

export default async (req, res) => {
		Promise.all(apis.map(api => fetchWithContext(api.url, api.context, api.keyPath))).then(rdf => {
		let file = rdf.join('')
		file += fs.readFileSync('contexts/bikes.owl', 'utf8')
		
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
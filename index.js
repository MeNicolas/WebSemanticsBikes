const jsonld = require('jsonld')
const axios = require('axios')
var jsonld_request = require('jsonld-request')

const context = {
	"@vocab": "http://schema.org/",
	"@base": "http://data.org/",
	"stationCode": "@id",
	"station_id": null,
	"num_bikes_available": null,
	"numBikesAvailable": "availableBikes",
	"num_bikes_available_types": null,
	"num_docks_available": null,
	"numDocksAvailable": "availableDocks",
	"is_installed": null,
	"is_returning": null,
	"is_renting": null,
	"last_reported": "lastUpdated"
}

jsonld_request('https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json', function(err, res, data) {
	let doc = data.data.stations
	doc.forEach(s => s['@context'] = context)
	// jsonld.compact(doc, context)
	// .then(compacted => 
	// 	console.log(JSON.stringify(compacted, null, 2))
	// );
	
	jsonld.toRDF(doc, {format: 'application/n-quads'})
	.then(rdf => 
		console.log(rdf)
	);
});

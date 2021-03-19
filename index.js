const jsonld = require('jsonld')
const axios = require('axios')
var jsonld_request = require('jsonld-request')
var fs = require("fs");

//For velib (live data) no coordinates and no name link api : https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json 
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

// For velib coordinates and name link api : https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json
const context_coord = {
	"@vocab": "http://schema.org/",
	"@base": "http://data.org/",
	"station_id":null,
	"rental_method":null,
	"name":"name",
	"lat":"lat",
	"lon":"lon",
	"capacity" : "capacity",
	"stationCode":"@id"
}

//for St etienne live link api (no coordinates) : https://saint-etienne-gbfs.klervi.net/gbfs/en/station_status.json
const context2 = { 
	"@vocab": "http://schema.org/",
	"@base": "http://data.org/",
	"station_id": "@id",
	"num_bikes_available": "availableBikes",
	"num_docks_available": "availableDocks",
	"is_installed": null,
	"is_renting": null,
	"is_returning": null,
	"last_reported": "lastUpdated"
}

//For st etienne with coordinates live link api : https://saint-etienne-gbfs.klervi.net/gbfs/en/station_information.json
const context2_coord = {
	"@vocab": "http://schema.org/",
	"@base": "http://data.org/",
    "station_id":"@id",
    "name":"name",
    "lat":"lat",
    "lon":"lon",
    "capacity" : "capacity"
}

// for rennes api = https://www.star.fr/le-velo?pnfstarod_data=bike for each records.fields
//Contains directly the coordinates (live data)
const context3 = {
	"@vocab": "http://schema.org/",
	"@base": "http://data.org/",
	"etat" : null,
	"lastupdate":"lastUpdated",
	"nombrevelosdisponibles": "availableBikes",
	"nombreemplacementsactuels":null,
	"nom":"name",
	"nombreemplacementsdisponibles":"availableDocks",
	"idstation": "@id",
	"coordonnees": "coordinates" //Don't know how to convert an array coordinates to lat, lon .
}

all_links = ["https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json",
			"https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json",
			"https://saint-etienne-gbfs.klervi.net/gbfs/en/station_status.json",
			"https://saint-etienne-gbfs.klervi.net/gbfs/en/station_information.json",
			"https://www.star.fr/le-velo?pnfstarod_data=bike"]
jsonld_request('https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json', async function(err, res, data) {
	let doc = data.data.stations
	doc.forEach(s => s['@context'] = context)
	// jsonld.compact(doc, context)
	// .then(compacted => 
	// 	console.log(JSON.stringify(compacted, null, 2))
	// );
	
	const rdf = await jsonld.toRDF(doc, {format: 'application/n-quads'});
	/*fs.writeFile('output.ttl', rdf, function(err) {
	if (err) {
	   return console.error(err);
	}});*/
});

jsonld_request('https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_information.json', async function(err, res, data) {
	let doc = data.data.stations
	doc.forEach(s => s['@context'] = context_coord)
	// jsonld.compact(doc, context)
	// .then(compacted => 
	// 	console.log(JSON.stringify(compacted, null, 2))
	// );
	
	const rdf = await jsonld.toRDF(doc, {format: 'application/n-quads'});
	fs.writeFile('output.ttl', rdf, function(err) {
	if (err) {
	   return console.error(err);
	}});
});



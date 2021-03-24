import axios from 'axios'
import querystring from 'querystring';

export async function query(q) {
	try {
		console.log(q)
		let res = await axios.post(process.env.SPARQL_URL+'/query', querystring.stringify({query: q}), {
			auth: {
			  username: process.env.SPARQL_USERNAME,
			  password: process.env.SPARQL_PASSWORD
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		let data = res.data.results.bindings
		data = data.map(e => {
			let result = {}
			for (let key in e) {
				switch (e[key]['datatype']) {
					case 'http://www.w3.org/2001/XMLSchema#integer': result[key] = parseInt(e[key]['value']); break
					case 'http://www.w3.org/2001/XMLSchema#double': result[key] = parseFloat(e[key]['value']); break
					default: result[key] = e[key]['value'];
				}
				
			}
			return result
		})
		return data
	} catch (error) {
		console.log(error)
	}
}
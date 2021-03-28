export default `
@prefix : <http://velo.fr/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

: a owl:Ontology .

:NormalStation a owl:Class ;
	rdfs:subClassOf :Station ;
	owl:disjointWith :OnlyFreeDocksStation,
		:OnlyFullDocksStation ;
	owl:equivalentClass [ a owl:Class ;
			owl:intersectionOf ( :Station [ a owl:Class ;
						owl:complementOf :OnlyFreeDocksStation ] [ a owl:Class ;
						owl:complementOf :OnlyFullDocksStation ] ) ] .

:capacity a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:int .

:lastUpdated a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:int .

:lat a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:double .

:lon a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:double .

:name a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:string .

:availableBikes a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:int .

:availableDocks a owl:DatatypeProperty,
		owl:FunctionalProperty ;
	rdfs:domain :Station ;
	rdfs:range xsd:int .

:OnlyFreeDocksStation a owl:Class ;
	owl:disjointWith :OnlyFullDocksStation ;
	owl:equivalentClass [ a owl:Class ;
			owl:intersectionOf ( :Station [ a owl:Restriction ;
						owl:onDataRange xsd:int ;
						owl:onProperty :availableBikes ;
						owl:qualifiedCardinality "0"^^xsd:nonNegativeInteger ] ) ] .

:OnlyFullDocksStation a owl:Class ;
	owl:equivalentClass [ a owl:Class ;
			owl:intersectionOf ( :Station [ a owl:Restriction ;
						owl:onDataRange xsd:int ;
						owl:onProperty :availableDocks ;
						owl:qualifiedCardinality "0"^^xsd:nonNegativeInteger ] ) ] .

:Station a owl:Class .
`
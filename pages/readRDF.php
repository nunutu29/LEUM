<?php
require_once("../vendor/autoload.php" );
require_once("utils.php");
$index = 0;

function GetMenu($from = GetGraph){
	$Menu = "";
	$fromVar = $from != "" ? "FROM <$from>" : "";
	$Prefix = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			   PREFIX fabio: <http://purl.org/spar/fabio/>
			   PREFIX fab: <http://purl.org/fab/ns#>
			   PREFIX frb: <http://frb.270a.info/dataset/>
			   PREFIX frbr: <http://purl.org/vocab/frbr/core#>
			   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
			   PREFIX dcterms: <http://purl.org/dc/terms/>
			   PREFIX oa: <http://www.w3.org/ns/oa#> ";
			   
	$Query = "";
	$pos = strpos($from, "ltw1516");
	if($pos === false)		   
		$Query = "Select DISTINCT ?title ?url
				 $fromVar 
				  WHERE {{?b a fabio:Expression; fabio:hasRepresentation ?url.
						 ?a a oa:Annotation; oa:hasBody ?body. 
						 ?body rdf:predicate dcterms:title; rdf:subject ?b; rdf:object ?title }
						 UNION {?work a fabio:Work ; fabio:hasPortrayal ?url.
						 	?url a fabio:Item ; rdfs:label ?title.
						 }
						 UNION {?b a fabio:Expression; fabio:hasRepresentation ?url.
						 ?a a oa:Annotation; oa:hasBody ?body. 
						 ?body rdf:predicate 'dcterms:title'; rdf:subject ?b; rdf:object ?title 
						 }
						} Limit 50";
	else
		$Query = "Select DISTINCT ?title ?url
				 $fromVar 
				  WHERE {?b a fabio:Expression; fabio:hasRepresentation ?url; foaf:name ?title}";
				  
	$Rows = SELECT($Prefix.$Query);
	if($Rows != null)
		foreach($Rows as $Row){
			$myStr = substr($Row->title, 0, strrpos(substr($Row->title, 0, 30), ' '))."...";
			if(strlen($Row->title) < 30) $myStr = $Row->title;
			$url = $Row->url;
			$Menu .= "<li><a class=\"gn-icon gn-icon-file\" title=\"".$Row->title."\" onclick=\"Page.GetData('".$url."','".$myStr."', '0', '$from')\">".$myStr."</a></li>";
		}
		return $Menu;
}
function SearchIfExists($uri, $from = GetGraph){
	$Prefix = "PREFIX frbr: <http://purl.org/vocab/frbr/core#> ";
	$Query = "SELECT DISTINCT * FROM <$from> WHERE {<$uri> ?a frbr:item.}";
	$result = DirectSELECT($Prefix.$Query);
	$result = json_decode($result)->results->bindings;
	return count($result) > 0;
}

function GetCiteIndex($expression){
	$query = "SELECT ?cite
			FROM <http://vitali.web.cs.unibo.it/raschietto/graph/ltw1516>
			WHERE{
				?ann <http://www.w3.org/ns/oa#hasBody> ?body.
				?body 	<http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> <$expression>
						<http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> <http://purl.org/spar/cito/cites>;
						<http://www.w3.org/1999/02/22-rdf-syntax-ns#object> ?cite.
			}";
	$result = DirectSELECT($query);
	$result = json_decode($result)->results->bindings;
	$number = $result[count($result) - 1]->cite->value;
	return (1+(int)strrev((int)strrev( $number )));
}
function countAnnotations(){
	$query = "SELECT ?ann
			FROM <http://vitali.web.cs.unibo.it/raschietto/graph/ltw1516>
			WHERE{
				?ann <http://www.w3.org/ns/oa#hasBody> ?body.
				?body 	<http://www.w3.org/1999/02/22-rdf-syntax-ns#subject> ?exp;
						<http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate> ?predicate;
						<http://www.w3.org/1999/02/22-rdf-syntax-ns#object> ?cite.
			}";
			
	$result = DirectSELECT($query);
	$array = json_decode($result)->results->bindings;
	$final = 0;
	foreach($array as $val){
		$temp = (int)strrev((int)strrev($val->ann->value ));
		if($temp > $final)
			$final = $temp;
	}
	return $final + 1;
}
function GetMenuGroups(){
$Query = "SELECT DISTINCT ?uri WHERE {GRAPH ?uri {?s ?p ?o} }";
$result = DirectSELECT($Query);
$result = json_decode($result)->results->bindings;
//if ($result == null || $result->numRows() ==  0) return "";
$menu = "";
foreach($result as $r){
	$name = explode("/",$r->uri->value);
	$name = $name[count($name) - 1];
	if ($name == "essepuntato" || $name == "ltw1525" || $name == "ltw1516" || $name == "" || $name == "ltw1508" || $name == "ltw1513" || $name == "ltw1511"  || $name == "ltw1540" || $name == "ltw1536" || $name == "ltw1514" || $name == "ltw1510") continue;
	$name = strtoupper($name);
	$menu .= "<li>";
	$menu .= "<a class=\"gn-icon gn-icon-groups\" onclick=\"ToggleSibling(this)\">$name</a>";
	$menu .= "<ul class=\"gn-submenu\" style=\"display:none;\">";
	$menu .= GetMenu($r->uri->value);
	$menu .= "</ul>";
	$menu .= "</li>";
}
return $menu;
}

function GetData($url, $from = GetGraph){
	$query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
			PREFIX foaf: <http://xmlns.com/foaf/0.1/>
			PREFIX schema: <http://schema.org/>
			PREFIX oa: <http://www.w3.org/ns/oa#>
			PREFIX rsch: <http://vitali.web.cs.unibo.it/raschietto/person/>
			PREFIX frbr: <http://purl.org/vocab/frbr/core#>

			SELECT DISTINCT ?ann ?by ?at ?label ?id ?start ?end ?subject ?predicate ?object ?bLabel ?name ?email ?key 
			FROM <$from> 
			WHERE {
					?ann a oa:Annotation ;
						oa:hasTarget ?target ;
						oa:hasBody ?body ;
						oa:annotatedBy ?by ;
						oa:annotatedAt ?at .
					OPTIONAL { ?ann rdfs:label ?label }.
					?target a oa:SpecificResource ;
							oa:hasSource <$url> ;
							oa:hasSelector ?sel.
					?sel a oa:FragmentSelector ;
							rdf:value ?id.
					OPTIONAL{?sel oa:start ?start ; oa:end ?end.}.
					?body a rdf:Statement ;
							rdf:subject ?subject ;
							rdf:predicate ?predicate ;
							rdf:object ?object ;
					OPTIONAL { ?body rdfs:label ?bLabel }
					OPTIONAL { SELECT ?by (SAMPLE(?NAME) as ?name)
								WHERE { ?by foaf:name ?NAME } GROUP BY ?by}.
					OPTIONAL { ?by schema:email ?email }.
					OPTIONAL { SELECT ?ann ?body ?object (SAMPLE(?KEY) as ?key)
								WHERE {
								?ann oa:hasBody ?body .
								?body rdf:object ?object .
								?object rdfs:label ?KEY}
								GROUP BY ?ann ?body ?object}
			}";
	return DirectSELECT($query);
}

?>

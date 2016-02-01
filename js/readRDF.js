function DirectSELECT(querry, callback, loader){
	loader = loader || false;
	querry = querry.replace(/#/g,"%23");
	var select = new SELECT();
	select.GO({loader: loader, Query: querry, callback: function(str){callback(str)}});
}

var readRDF= (function (){
  var self ={};
  var ReadingGraph = "";
  self.GetGraph = function () {
    return "http://vitali.web.cs.unibo.it/raschietto/graph/ltw1516"
  }
  self.GetMenu = function (fromquerry) {
	fromquerry = fromquerry || self.GetGraph();
	var Query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
				 PREFIX fabio: <http://purl.org/spar/fabio/>\
				 PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
				 PREFIX dcterms: <http://purl.org/dc/terms/>\
				 PREFIX oa: <http://www.w3.org/ns/oa#>\
				 PREFIX foaf: <http://xmlns.com/foaf/0.1/>';

	Query += " SELECT DISTINCT ?title ?url\
			   FROM <"+fromquerry+">\
			   WHERE {?b a fabio:Expression; fabio:hasRepresentation ?url; foaf:name ?title}";
	DirectSELECT(Query, self.CallBackMenu, false);
  }
  self.CallBackMenu = function(res){
    res = res.results.bindings;
	$("ul.doc-annotati").empty();
	$("div.content2 div.row").empty();
    if (res.length != 0) {
      for(var i=0; i<res.length; i++ ){
        var title = res[i].title.value;
        if(title.length < 30)
          var shorttittle = title;
        else {
          var shorttittle = title.substr(0, title.substr(0, 30).lastIndexOf(' '))+"...";
        }
        var url = res[i].url.value;
        $("ul.doc-annotati").append("<li><a class=\"gn-icon gn-icon-file grey-text text-darken-2 latest_tweets\" title=\""+title+"\" onclick=\"Page.GetData('"+url+"','"+shorttittle+"', '0', '" + self.GetGraph() + "')\">"+shorttittle+"</a></li>");
        $("div.content2 div.row").append("<div class=\"card card-1 col-sm-3\" style=\"margin-right: 3%; margin-left: 3%;\"><div class=\"card-content\"><span class=\"card-title activator grey-text text-darken-4\">"+shorttittle+"</span><p><a onclick=\"Page.GetData('"+url+"','"+shorttittle+"', '0', '" + self.GetGraph() + "'); ShowMenu(); \">Vedi articolo</a><span class=\"card-title activator grey-text text-darken-4\"><i class=\"material-icons right\">more_vert</i></span></p></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\"><i class=\"material-icons right\">close</i></span><p>"+title+"</p></div></div>");

      }
    }
  }
  self.EnableIfExists = function(url) {
	  //Controllo per abilitare cancellaTutto oppure Ri-Annota
	  var Query = self.GetQuery(self.GetGraph(), url) + " LIMIT 1 ";
	  DirectSELECT(Query, function(res){
		  var json = res.results.bindings;
		  if(json.length == 0){
			$("#cancella-ann").parent().hide();
			$("#ri_ann").parent().show();
		  }
		  else
		  {
			$("#cancella-ann").parent().show();
			$("#ri_ann").parent().hide();
		  }
	  });
	  $("#ListaGruppi input[type='checkbox']").each(function(){
		  var from = "http://vitali.web.cs.unibo.it/raschietto/graph/" + this.getAttribute("id");
		  var Query = self.GetQuery(from, url) + " LIMIT 1 ";
		  var chk = this;
		  DirectSELECT(Query, function(res){
			  var json = res.results.bindings;
			  if(json.length == 0)
			  {
				  chk.disabled = true;
				  chk.checked = false;
			  }
		  });
	  });
  }
  self.GetData = function (fromquerry, url) {
    fromquerry = fromquerry || self.GetGraph();
    var Query = self.GetQuery(fromquerry, url);
	if(fromquerry == self.GetGraph())
		DirectSELECT(Query, self.CallBackData);
	else
	{
		ReadingGraph = fromquerry.split('/').pop();
		DirectSELECT(Query, self.CallBackDataGroup);
	}
	self.EnableIfExists(url);
  }
  self.CallBackData = function (res) {
    sessionStorage.setItem('ann', "");
    sessionStorage.setItem('annotation', JSON.stringify(res));
  }
  self.CallBackDataGroup = function(res){
	sessionStorage.setItem('ann'+ReadingGraph, JSON.stringify(res));
	Scrap.Groups.ReadMulti(ReadingGraph);
  }
  self.GetQuery = function(fromquerry, url){
	return "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
  			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  			PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\
  			PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
  			PREFIX schema: <http://schema.org/>\
  			PREFIX oa: <http://www.w3.org/ns/oa#>\
  			PREFIX rsch: <http://vitali.web.cs.unibo.it/raschietto/person/>\
  			PREFIX frbr: <http://purl.org/vocab/frbr/core#>\
  			SELECT DISTINCT ?ann ?by ?at ?label ?id ?start ?end ?subject ?predicate ?object ?bLabel ?name ?email ?key ?grafo\
  			FROM <"+fromquerry+">\
  			WHERE {\
  					?ann a oa:Annotation ;\
  						oa:hasTarget ?target ;\
  						oa:hasBody ?body ;\
  						oa:annotatedBy ?by ;\
  						oa:annotatedAt ?at .\
  					OPTIONAL { ?ann rdfs:label ?label }.\
  					?target a oa:SpecificResource ;\
  							oa:hasSource <"+url+"> ;\
  							oa:hasSelector ?sel.\
  					?sel a oa:FragmentSelector ;\
  							rdf:value ?id.\
  					OPTIONAL{?sel oa:start ?start ; oa:end ?end.}.\
  					?body a rdf:Statement ;\
  							rdf:subject ?subject ;\
  							rdf:predicate ?predicate ;\
  							rdf:object ?object ;\
  					OPTIONAL { ?body rdfs:label ?bLabel }\
  					OPTIONAL { SELECT ?by (SAMPLE(?NAME) as ?name)\
  								WHERE { ?by foaf:name ?NAME } GROUP BY ?by}.\
  					OPTIONAL { ?by schema:email ?email }.\
  					OPTIONAL { SELECT ?ann ?body ?object (SAMPLE(?KEY) as ?key)\
  								WHERE {\
  								?ann oa:hasBody ?body .\
  								?body rdf:object ?object .\
  								?object rdfs:label ?KEY}\
  								GROUP BY ?ann ?body ?object} }";
  }
  self.ReadGroups = function(){
	var api =  new API();
	api.chiamaServizio({loader: false, requestUrl: "gruppi.json", isAsync:true, callback: function(json){
		$("#ListaGruppi").empty();
		for(var i = 0; i < json.length; i++){
			if(json[i].id == "ltw1516") continue;
			$("#ListaGruppi").append(
				$("<li>").append($("<input>").attr("id", json[i].id).attr("type","checkbox").attr("onchange","Scrap.Groups.Load(this)"))
						 .append($("<label>").attr("for", json[i].id))
						 .append($("<a>").attr("style", "text-transform:capitalize;").text(json[i].nome))
			);
		}
		sessionStorage.setItem("GroupNames", JSON.stringify(json));
	}});
  }
  self.DecodeGroupName = function(id){
	var json = JSON.parse(sessionStorage.getItem("GroupNames"));
	for(var i = 0; i<json.length; i++){
		if (id == json[i].id) 
			return json[i].nome;
	}
	return id;
  }
  return self;
}());

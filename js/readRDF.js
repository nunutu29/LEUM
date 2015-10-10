var readRDF= (function (){
  var self ={};
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
      if (fromquerry.indexOf("ltw1516") == -1) {
       Query += "SELECT DISTINCT ?title ?url FROM <"+fromquerry+">\
       WHERE {{?b a fabio:Expression; fabio:hasRepresentation ?url.\
          ?a a oa:Annotation; oa:hasBody ?body.\
          ?body rdf:predicate dcterms:title; rdf:subject ?b; rdf:object ?title }\
          UNION {?work a fabio:Work ; fabio:hasPortrayal ?url.\
           ?url a fabio:Item ; rdfs:label ?title.\
         }\
          UNION {?b a fabio:Expression; fabio:hasRepresentation ?url.\
          ?a a oa:Annotation; oa:hasBody ?body.\
          ?body rdf:predicate 'dcterms:title'; rdf:subject ?b; rdf:object ?title\
        }\
      } Limit 50";}
      else {
        Query += "SELECT DISTINCT ?title ?url FROM <"+fromquerry+">\
        WHERE {?b a fabio:Expression; fabio:hasRepresentation ?url; foaf:name ?title}";
      }
      var res = DirectSELECT(Query, self.CallBack);
  }
  self.CallBack = function(res){
    res = res.results.bindings;
    if (res.length != 0) {
      for(var i=0; i<res.length; i++ ){
        var title = res[i].title.value;
        if(title.length < 30)
          var shorttittle = title;
        else {
          var shorttittle = title.substr(0, title.substr(0, 30).lastIndexOf(' '))+"...";
        }
        var url = res[i].url.value;
        $("ul.gn-submenu.doc-annotati").append("<li><a class=\"gn-icon gn-icon-file\" title=\""+title+"\" onclick=\"Page.GetData('"+url+"','"+shorttittle+"', '0', '$from')\">"+shorttittle+"</a></li");
      }
    }
  }
  self.SearchIfExists = function() {

  }
 return self;
}());

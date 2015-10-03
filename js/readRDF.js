var readRDF= (function (){
  var self ={};
  self.GetGraph = function () {
    return "http://vitali.web.cs.unibo.it/raschietto/graph/ltw1516"
  }
  self.GetMenu() = function (fromquerry) {
    fromquerry = fromquerry || self.GetGraph();
    var Query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  			   PREFIX fabio: <http://purl.org/spar/fabio/>\
  			   PREFIX fab: <http://purl.org/fab/ns#>\
  			   PREFIX frb: <http://frb.270a.info/dataset/>\
  			   PREFIX frbr: <http://purl.org/vocab/frbr/core#>\
  			   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
  			   PREFIX dcterms: <http://purl.org/dc/terms/>\
  			   PREFIX oa: <http://www.w3.org/ns/oa#> ';
      if 
     Query +=

  }
  return self;
}());

<?php
require_once('utils.php');
require_once('insertRDF.php');
require_once('readRDF.php');
$data = json_decode(file_get_contents("php://input"),true) ; //Variabili passati tramite POST
$StartScrapper = $data['StartScrapper'];
$url = $data['link']; //INDIRIZZO DA LEGGERE
if(strtolower(substr($url, 0, 3)) == "www") $url = "http://".$url;
$mURL = getURL($url); //INDIRIZZO senza nome
$files = explode("/", $url);
$nomeDoc = $files[count($files) - 1];
$doc = new DOMDocument();
libxml_use_internal_errors(true);
try{
	$doc->loadHTMLFile($url); //Carico il file
}
catch(Exception $ex){
	echo "Nessuna connesione a Internet.";
	exit;
}
$xpath = new DOMXPath($doc); 
$isOUR = "";
if (strpos($url, "www.dlib.org/dlib/january14") !== false) $isOUR = "dlib2";
elseif(strpos($url, "www.dlib.org") !== false) $isOUR = "dlib";
elseif(strpos($url, "rivista-statistica.unibo.it") !== false) $isOUR = "RS";
elseif (strpos($url, "montesquieu.unibo.it") !== false) $isOUR = "AM";
elseif (strpos($url, "antropologiaeteatro.unibo.it") !== false) $isOUR = "AT";
try{
	$doc = AddIDs($doc->getElementsByTagName('html')->item(0), "");
}
catch(Exception $e){
	echo "Indirizzo non raggiungibile.";
	exit;
}
$ArtTitle = $doc->getElementsByTagName('title')->item(0)->nodeValue;
$ArtTitle = Normalize($ArtTitle);
switch($isOUR){
	case "dlib": case "dlib2":
		$contentTable = $doc->getElementsByTagName('table')->item(8); // Prendo la tabella di posizione 8
	break;
	case "RS": case "AM": case "AT": 
		$contentTable = $xpath->query("//*[@id='div1_div2_div2_div3']", $doc)->item(0);
	break;
	default:
		$contentTable = $xpath->query("//*[@id='div1_div2_div2_div3']", $doc)->item(0);
		if($contentTable == null)
			$contentTable = $doc->getElementsByTagName('body')->item(0);
	break;
}
/*Remove all script tags*/
if($contentTable != null){
	$domElemsToRemove = array(); 
	$scripts = $contentTable->getElementsByTagName('script');
	foreach ($scripts as $script){$domElemsToRemove[] = $script; }
	foreach( $domElemsToRemove as $domElement ) {$domElement->parentNode->removeChild($domElement);  }
	/*Add target=_blank to all hrefs that don't start with # */
	foreach($xpath->query('//a[@href][not(starts-with(@href,"#"))]',$contentTable) as $link) 
	{$link->setAttribute('target','_blank'); }
	//$contentTable = AddIDs($contentTable, $contentTable->nodeName."1");
	$xml = $contentTable->ownerDocument->saveHTML($contentTable);
	/*Replace all relative URI with absolute*/
	$xml = preg_replace('/((?:href|src) *= *[\'"](?!#)(?!(http|ftp|\/\/)))/i', "$1$mURL", $xml);
	if($StartScrapper == "1"){
		if(!SearchIfExists($url)){
			switch($isOUR){
				case "dlib":
					InsertDlib($xml, $mURL, $nomeDoc, $ArtTitle);
				break;
				case "RS":
					InsertJournals($xml, $mURL, $nomeDoc, $ArtTitle);
				break;
				case "AM":
					InsertJournalsAM($xml, $mURL, $nomeDoc, $ArtTitle);
					break;
				case "AT":
					InsertJournalsAT($xml, $mURL, $nomeDoc, $ArtTitle);
				break;
				case "dlib2":
					InsertDlib2($xml, $mURL, $nomeDoc, $ArtTitle);
				break;
				default:
					InsertStandart($xml, $mURL, $nomeDoc, $ArtTitle);
				break;
			}
		}
	}
	//echo $xml;
}
//else
	//echo "URI NON SOPPORTATO.";
?>



<?php 

require_once("insertRDF.php");
require_once("readRDF.php");
$data = file_get_contents("php://input");
if(trim($data) == "") exit();
$file="ann.json";
$content = file_get_contents($file);
$data = mb_convert_encoding($data, 'HTML-ENTITIES', "UTF-8");
if(trim($content)=="")
	file_put_contents($file, $data);
else
{	$newD = json_decode($data);
	$vars = explode("|", $content);
	$varNew = "";
	foreach($vars as $c){
		$obj = json_decode($c);
		if($obj->azione->value != "D" && $obj->predicate->value == $newD->predicate->value && $obj->value->value == $newD->value->value && $obj->start->value == $newD->start->value && $obj->end->value == $newD->end->value ){
			continue;
		}
		$varNew .= "|".$c;
	}
	file_put_contents($file, $data.$varNew);
}
return;
/* $content = file_get_contents("annotation.json");
$object = json_decode($content);

$remove = Enter($object->annotations);


function Enter($arr){
	foreach($arr as $ann){
		if(gettype($ann) == "array") Enter ($ann);
		else {
			$fount = Search($ann);
		}
	}
}
function Search($var){
	if(isset($var->target)){
		if($var->target->id) == 
	}
	return false;
} */
?>

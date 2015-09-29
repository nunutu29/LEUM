<?php 
require_once("insertRDF.php");
require_once("readRDF.php");
$data = json_decode(file_get_contents("php://input"),true) ; 
$uri = $data["link"];
$from = $data["from"];
$file = "annotation.json";
//$content =  json_encode(GetAll($uri, $from));
$content = GetData($uri, $from);
file_put_contents($file, $content);
file_put_contents("ann.json", "");
exit();
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<link rel="shortcut icon" href="./dest/img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="./dest/img/favicon.ico" type="image/x-icon">
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	<title>Raschietto</title>
	<link rel="stylesheet" href="./dest/css/index.min.css">

	
</head>
<body class="blue tumblr loading">
<div class="modalBox no-opacity" id="myLoader" style="display:block;"><?php include('loader.php');?></div>
	<input type="text" name="URL" id="URL" style="display:none;">
	<input type="text" name="BUTTON_RIANNOTA" id="BUTTON_RIANNOTA" style="display:none;">
	<div class="container" id="container">
		<?php include('menu.php');?>
		<?php include('ann-menu.php');?>
		<div class="content">
			<div class="content2 col-sm-12">
				<div class="row">
				 <!-- merda aggiunto -->
				</div>
			</div>
		</div>
	</div>
	<div id="modalBox" class="modalBox" style="display:none;"></div>
	<div id="modalBoxRegister" class="modalBox" style="display:none;">
		<div id="modalReg"></div>
	</div>
	<div id="modalBoxView" class="modalBox" style="display:none;">
		<div id="view" class="ann-details ann-shower modal purple wisteria" style="display:block;"></div>
	</div>
	<a href="#0" class="cd-top">Top</a>
	<style>@import url("./dest/css/mediaq.min.css")</style>
	<script type="text/javascript" src="./dest/js/index.min.js"></script>
	</body>
</html>
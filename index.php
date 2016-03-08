<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="img/favicon.ico" type="image/x-icon">
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	<title>Raschietto</title>
  

	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<link rel="stylesheet" href="css/flat-ui.min.css">
	<link rel="stylesheet" href="css/materialize.css" media="screen" title="no title" charset="utf-8">
	<link rel="stylesheet" href="css/demo.css" type="text/css"/>
	<link rel="stylesheet" href="css/component.css" type="text/css"/>
	<link rel="stylesheet" href="css/login.css" type="text/css"/>
	<link rel="stylesheet" href="css/jquery.mCustomScrollbar.css" type="text/css"/>
	<link rel="stylesheet" href="css/bootstrap.css" type="text/css"/>
	<link rel="stylesheet" href="css/style.css" type="text/css"/>
	<!-- NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! -->
	<script src="js/jquery-1.11.2.js"></script>
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
	
	<?php //include('constructor.php');?>
	<div id="modalBox" class="modalBox" style="display:none;"></div>
	<div id="modalBoxRegister" class="modalBox" style="display:none;">
		<div id="modalReg"></div>
	</div>
	<div id="modalBoxView" class="modalBox" style="display:none;">
		<div id="view" class="ann-details ann-shower modal purple wisteria" style="display:block;"></div>
	</div>
	<a href="#0" class="cd-top">Top</a>
	<style>a{text-decoration:none !important;cursor:pointer}button{text-decoration:none !important}a span{cursor:pointer}@media all and (max-width: 1920px){.cd-top{top:6%}#modalReg .commnet-user{margin-top:-webkit-calc(100% - 13em);margin-top:calc(100% - 13em)}.logoraschetto{display:block}#filter-list{display:none}}@media screen and (max-width: 1200px){.cd-top{top:6%}.logoraschetto{background:url("../img/logoRaschetto.svg");background-size:27em;background-repeat:no-repeat;width:26em}}@media screen and (max-width: 1024px){.cd-top{top:6%}.allow-scroll.gn-menu-wrapper.gn-open-all.latest_tweets{display:none}.logoraschetto{background:url("../img/logoRaschetto.svg");background-size:20em;background-repeat:no-repeat;width:21em;top:5%}}@media screen and (max-width: 1000px){.cd-top{top:6%}.changeLogin{width:45%}#modalBoxRegister .modal.modal-fixed-footer .modal-content{overflow-y:hidden}.logoraschetto{display:none}#login-open a{position:absolute;top:0%;right:10%}#ciaoatutti{position:absolute;right:10%}}@media screen and (max-width: 800px){.logoraschetto{display:none}.changeLogin{width:45%}}@media screen and (max-width: 768px){.logoraschetto{display:none}.changeLogin{width:40%}.slides h3{font-size:2.1rem}.slides h4{font-size:1.7rem}#modalReg .modal-footer .row{margin-top:22%}#modalReg.modal{width:100% !important;height:100%;max-height:75% !important}}@media screen and (max-width: 540px ){#aboutus{width:100% !important;overflow:hidden !important}.slides svg{width:50% !important}#hide-ann{position:absolute;right:-11%}#change-target{width:5em}#iperTextArea{width:85%}#imgLogo{width:15em}h2{font-size:4rem}#view.modal{width:100%;margin-top:10%}#idDiMerda.modal{width:100% !important}.content2{max-width:100%;width:100%}.changeLogin{width:90%}.logoraschetto{display:none}}#login-form div.col-sm-offset-1.col-sm-5.col-sm-pull-6.center{margin-top:2%}.bottom-space{margin-bottom:2%}@media screen and (max-width:480px){h2{font-size:4rem}#view.modal{width:100%;margin-top:10%}#idDiMerda.modal{width:100% !important}.content2{max-width:100%;width:100%}.changeLogin{width:90%}.logoraschetto{display:none}}#login-form div.col-sm-offset-1.col-sm-5.col-sm-pull-6.center{margin-top:2%}.bottom-space{margin-bottom:2%}@media screen and (max-width: 422px){.gn-menu-wrapper.gn-open-all{-webkit-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px);width:100%}.gn-menu-wrapper.gn-open-all .gn-scroller{width:130%}}@media screen and (max-width:380px){.cd-top.cd-is-visible{visibility:hidden;opacity:0;display:none}#change-target{display:none}.gn-icon.gn-icon-ann-edit,.gn-icon.gn-icon-ann-ex,.gn-icon.gn-icon-ann-title,.gn-icon.gn-icon-ann-autore,.gn-icon.gn-icon-ann-doi,.gn-icon.gn-icon-ann-annop,.gn-icon.gn-icon-ann-url,.gn-icon.gn-icon-ann-commento,.gn-icon.gn-icon-ann-retorica,.gn-icon.gn-icon-ann-cites{display:none}#longLogo .content h2{font-size:1.3em}}</style>
	
	<script src="js/prefixfree.min.js"></script>
	<script src="js/classie.js"></script>
	<script src="js/api.js"></script>
	<script src="js/cookie.js"></script>
	<script src="js/app.js"></script>
	<script src="js/jquery.mCustomScrollbar.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/select2.full.min.js"></script>
	<script type="text/javascript" src="js/materialize.js"></script>
	<script type="text/javascript" src="js/readRDF.js"></script>
	<script type="text/javascript" src="js/ann-menu.js"></script>
	<script type="text/javascript" src="js/register.js">//script register che deve comparire nel app</script>
	<script src="js/back_to_top.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>
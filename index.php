<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="img/favicon.ico" type="image/x-icon">
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	<title>Raschietto</title>
	<link rel="stylesheet" type="text/css" href="css/normalize.css" /><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'><link href='https://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'><link rel="stylesheet" href="css/flat-ui.min.css"><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link rel="stylesheet" href="css/materialize.css" media="screen" title="no title" charset="utf-8"><link rel="stylesheet" type="text/css" href="css/demo.css" /><link rel="stylesheet" type="text/css" href="css/component.css" /><link rel="stylesheet" type="text/css" href="css/login.css" /><link rel="stylesheet" href="css/jquery.mCustomScrollbar.css" /><link href="css/bootstrap.css" rel="stylesheet"><link rel="stylesheet" href="css/style.css">
	<!-- NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! -->
	<script src="js/prefixfree.min.js"></script>
	<!--<script src="js/modernizr.custom.js"></script>-->
	<script src="js/classie.js"></script>
	<script src="js/jquery-1.11.2.js"></script>
	<script src="js/api.js"></script>
	<script src="js/app.js"></script>
	<script src="js/jquery.mCustomScrollbar.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/select2.full.min.js"></script>
</head>
<body class="blue tumblr">
	<input type="text" name="URL" id="URL" style="display:none;">
	<div class="container" id="container">
		<?php include('menu.php');?>
		<?php include('ann-menu.php');?>
		<div class="content">
			<div id="tabs">
				<div class="content2 col-md-12">
					<div class="row">
					 <!-- merda aggiunto -->					 						 	
					</div>
					<?php if(isset($_COOKIE["email"])){ if($_COOKIE["name"] == "Root" || $_COOKIE["name"] == "root" || $_COOKIE["name"] == "admin" || $_COOKIE["name"] == "Admin") { ?>
					<div class="icons">
						<?php $foo = 0; function countandecho(&$foo){$foo = $foo + 1;echo $foo;}?>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-openup">gn-icon-openup <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-opendown">gn-icon-opendown <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-show">gn-icon-show <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-hide">gn-icon-hide <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-help">gn-icon-help <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-delete">gn-icon-delete <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-edit">gn-icon-edit <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-edit">gn-icon-ann-edit <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-target">gn-icon-ann-target <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-ex">gn-icon-ann-ex <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-register">gn-icon-register <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-title">gn-icon-ann-title <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-autore">gn-icon-ann-autore <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-doi">gn-icon-ann-doi <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-annop">gn-icon-ann-annop <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-url">gn-icon-ann-url <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-commento">gn-icon-ann-commento <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-retorica">gn-icon-ann-retorica <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-cites">gn-icon-ann-cites <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-search">gn-icon-search <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-file">gn-icon-file <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-groups">gn-icon-groups <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-lib">gn-icon-lib <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-netfile">gn-icon-netfile <?php  countandecho($foo);?></span>					 	
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-about">gn-icon-about <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-succ">gn-icon-ann-succ <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-johnny-user">gn-icon-johnny-user <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-add">gn-icon-ann-add <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-see">gn-icon-ann-see <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-menu">gn-icon-menu <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-filter">gn-icon-ann-filter <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-ann-exit">gn-icon-ann-exit <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-username">gn-icon-username <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-password">gn-icon-password <?php  countandecho($foo);?></span>
						<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-email">gn-icon-email <?php  countandecho($foo);?></span>
						<img class="col-md-5 col-md-offset-1" src="img/background-abstract3.png"></img>
					</div>
					<?php }} ?>
				</div>
			</div>
		</div>
	</div>
	<div class="modalBox" id="myLoader"><?php include('loader.php');?></div>
	
	<div id="modalBox" class="modalBox" style="display:none;"></div>
	<div id="modalBoxRegister" class="modalBox" style="display:none;">
		<div id="modalReg"></div>
	</div>
	<div id="modalBoxView" class="modalBox" style="display:none;">
		<div id="view" class="ann-details ann-shower"></div>
	</div>
	<a href="#0" class="cd-top">Top</a>
	<script src="js/back_to_top.js"></script>
	<style type="text/css">
		a {
			text-decoration: none!important;
			cursor: pointer;
		}
		button {
			text-decoration: none!important;
		}
		a span {
			cursor: pointer;
		}
		/*GENERIC ONES*/
		@media all and (min-width: 1024px) {
				/*.content2{
					max-width: 67%;
			    	float: right;
			    }*/
			    #filter-list{
			    	display: none;
			    }
			}
			@media all and (max-width: 1023px) {
				.allow-scroll.gn-menu-wrapper.gn-open-all.latest_tweets{
					display: none;
				}
			}
			@media screen and (max-width: 768px) {
				#modalReg .modal-footer .row {
					    margin-top: 22%;
				}
				#modalReg.modal{
					width: 100% !important;
					height: 100%;
					max-height: 60% !important;
				}
			}
			@media screen and (max-width: 540px ){
				#change-target{
					width: 5em;
				}
				#iperTextArea{
					width: 85%;
				}
				#imgLogo {
					width: 15em;
				}
			}
			@media screen and (max-width:440px) {
				.ann-details.ann-shower {
					min-width: 50%;
					max-width: 85%;
				}
				@media screen and (max-width:380px) {
					#change-target{
						DISPLAY: NONE;
					}
					.gn-icon.gn-icon-ann-edit,
					.gn-icon.gn-icon-ann-ex,
					.gn-icon.gn-icon-ann-title,
					.gn-icon.gn-icon-ann-autore,
					.gn-icon.gn-icon-ann-doi,
					.gn-icon.gn-icon-ann-annop,
					.gn-icon.gn-icon-ann-url,
					.gn-icon.gn-icon-ann-commento,
					.gn-icon.gn-icon-ann-retorica,
					.gn-icon.gn-icon-ann-cites
					{
						display: none;
					}
					#longLogo .content h2 {
						font-size: 1.3em;
					}
				}
				/*END GENERIC ONES*/
				@media all and (min-width: 1220px) {
				/*.content2{
					margin-left: 30%;
					float: left;
				}*/
			}
			@media screen and (max-width: 422px) {
				.gn-menu-wrapper.gn-open-all {
					-webkit-transform: translateX(0px);
					-moz-transform: translateX(0px);
					transform: translateX(0px);
					width: 100%;
				}
				.gn-menu-wrapper.gn-open-all .gn-scroller {
					width: 130%
				}
			}
		</style>
	</body>
	<script type="text/javascript" src="js/materialize.js"></script>
	<script type="text/javascript" src="js/readRDF.js"></script>
	<script type="text/javascript" src="js/ann-menu.js"></script>
	<script type="text/javascript" src="js/register.js">//script register che deve comparire nel app</script>
	<script type="text/javascript">
		var globalLoader = true;
		$('#hasTitle').change(function(){Scrap.ShowArray("hasTitle", this);});
		$('#hasAuthor').change(function(){Scrap.ShowArray("hasAuthor",this);});
		$('#hasDOI').change(function(){Scrap.ShowArray("hasDOI",this);});
		$('#hasPublicationYear').change(function(){Scrap.ShowArray("hasPublicationYear",this);});
		$('#hasURL').change(function(){Scrap.ShowArray("hasURL",this);});
		$('#hasComment').change(function(){Scrap.ShowArray("hasComment",this);});
		$('#hasIntro').change(function(){Scrap.ShowArray("deo:Introduction",this);});
		$('#hasConcept').change(function(){Scrap.ShowArray("skos:Concept",this);});
		$('#hasAbstr').change(function(){Scrap.ShowArray("sro:Abstract",this);});
		$('#hasMateria').change(function(){Scrap.ShowArray("deo:Materials",this);});
		$('#hasMeth').change(function(){Scrap.ShowArray("deo:Methods",this);});
		$('#hasRes').change(function(){Scrap.ShowArray("deo:Results",this);});
		$('#hasDisc').change(function(){Scrap.ShowArray("sro:Discussion",this);});
		$('#hasConc').change(function(){Scrap.ShowArray("sro:Conclusion",this);});
		$('#chasBody').change(function(){Scrap.ShowArray("cites", this, 0);});
		$('#chasTitle').change(function(){Scrap.ShowArray("hasTitle", this, 1);});
		$('#chasAuthor').change(function(){Scrap.ShowArray("hasAuthor",this, 1);});
		$('#chasDOI').change(function(){Scrap.ShowArray("hasDOI",this, 1);});
		$('#chasPublicationYear').change(function(){Scrap.ShowArray("hasPublicationYear",this, 1);});
		$('#chasURL').change(function(){Scrap.ShowArray("hasURL",this, 1);});
		// $('#MenuTrigger').on('touchstart', function(){Login.Remove();});
		// document.querySelector( "#MenuTrigger" ).addEventListener( "click", function() {
			//   this.classList.toggle( "active" );
			// });

$(document).on('touchstart click', '#login-open', function(event){
	event.stopPropagation();
	event.preventDefault();
	if(event.handled !== true) {
		Login.Show();
		event.handled = true;
	} else {
		return false;
	}
});
//Nascondiamo il login se si click fuori dalla form o dal botton
$(document).mousedown(function (e){
	var container = $('#login-form');
	var btnLogin = $('#login-open');
	if (!container.is(e.target) && container.has(e.target).length === 0 && !btnLogin.is(e.target) && btnLogin.has(e.target).length === 0)
	Login.Remove();
});
$('#logout').on({click: function(){Login.LogOut();}});
$('#login-button').on({click: function(){Login.Try();}});
$('#salvaReg').on({click: function(){Singin.Try()}});
$('.register-button').on({click: function(){
//crea modale per registrazione
	$("#modalBoxRegister").show();
	$("#modalBoxRegister #modalReg").remove();
	if($(window).width() < 1200)
		$("#modalBoxRegister").append('<?php include("pages/regModalMobile.php");?>');
	else
		$("#modalBoxRegister").append('<?php include("pages/regModal.php");?>');
	$("#cancellaReg").click(function(){$("#modalBoxRegister").hide();});
}});
var Page = (function (){
	var self = {};
	self.Search = function(){
		//Cerca il link e se non esiste lo agiunge
		var link = document.getElementById("iptSearch");
		if(link.value.indexOf("http://") != -1 || link.value.indexOf("www.") != -1)
		self.makeSearch(link.value, "Search...", "1", "http://vitali.web.cs.unibo.it/raschietto/graph/ltw1516");
		else
		alert("Solo URI ammessi.");
		link.value = "";
	};
	self.makeSearch = function(link, titolo, scrap, from){
		$('#URL').val(link);
		window.scrollTo(0,0);
		var myData = {link: link, StartScrapper: scrap};
		var str = "";
		var process1 = new API();
		process1.chiamaServizio({requestUrl: 'pages/GetPageOnly.php', data: myData, isAsync: true, callback: function(str){
			self.DisableCheckBox();
			self.WriteData(str);
			ShowMenu();
		}});
		var process2 = new API();
		process2.chiamaServizio({requestUrl: 'pages/pageScrapper.php', data: myData, isAsync: true, loader: false, callback: function(str){
			readRDF.GetMenu();
			readRDF.GetData(from, link);
			self.Uncheck();
			self.EnableCheckBox();
		}});
	};
	self.GetData = function(link, titolo, scrap, from){
		$('#URL').val(link);
		window.scrollTo(0,0);
		var myData = {link: link, StartScrapper: scrap};
		var api = new API();
		api.chiamaServizio({requestUrl: 'pages/GetPageOnly.php', data: myData, isAsync: true, callback: function(str){
			self.WriteData(str);
		}});
	readRDF.GetData(from, link);
	self.Uncheck();
	};
	self.WriteData = function (data){
		$(".content2").html(data);
	};
	self.DisableCheckBox = function(){
		var api =  new API();
		api.chiamaServizio({requestUrl: 'loader.php', isAsync: true, callback: function(str){
			$('#filtri .check-boxs').parent().append("<div class='modalBox' style='display:block' id='removeMePlease'>"+str+"</div>");
		}});
	}
	self.EnableCheckBox = function(){
		$('#removeMePlease').remove();
	}
	self.Uncheck = function(){
		$('.check-boxs input:checkbox').removeAttr('checked');
	}
	return self;
}());
//Caricamento menu
window.onload = function() {
	readRDF.GetMenu();
	readRDF.ReadGroups();
};
var str=null;
function AnnotaClick(){
	var str=manualAnn();
	if (str != null)
	Scrap.EditOpen(null, str, "I");
};
$('#save-ann').click(function() {var annotazione=$('#s').val();	annota(str,annotazione);});
window.onbeforeunload = function(){
	var ann = sessionStorage.getItem('ann');
	if(!ann == undefined || !ann == "")
	return 'Ci sono modifiche non salvate!';
};
$(window).on('unload', function(){
	sessionStorage.setItem('ann', "");
});
$("#iptSearch").keypress(function(){
	if ( event.which == 13 ) {Page.Search();}
});
$(document).ready(function(){
	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal-trigger').leanModal();
});
$(document).keyup(function(ev){
	//Se premuto ESC
    if(ev.keyCode == 27){
		//Se è visibile un qualsiasi modale
		if($(".modalBox").is(":visible")){
			if($("#cancellaReg").is(":visible"))
				//attendi 0.3 secondi prima di nascondere il modalBox, per far vedere l'animazione della form.
				setTimeout(function(){$(".modalBox").empty().hide();}, 300);
			else
				$(".modalBox").empty().hide( "drop", { direction: "down" }, "slow" );
		}
	}
});
function ShowMenu(){
	if(!$('#filter-menu').is(":visible")){
		$('#filter-menu').show();
		$('.content2').removeClass("col-md-12").addClass('col-md-9').attr("style", "float:right;");
	}
	if(!$("#floating-menu").is(":visible"))
		$("#floating-menu").show();
}

$('#login-open').click(function(){$('#dropdown1').attr('style', 'display:none')}); //fa sparire il dropdown 3dots quando clicco su accedi

</script>
</html>
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
<body class="blue tumblr loading">
<div class="modalBox no-opacity" id="myLoader" style="display:block;"><?php include('loader.php');?></div>
	<input type="text" name="URL" id="URL" style="display:none;">
	<div class="container" id="container">
		<?php include('menu.php');?>
		<?php include('ann-menu.php');?>
		<div class="content">
			<div class="content2 col-sm-12">
				<div class="row">
				 <!-- merda aggiunto -->

				</div>
				<?php if(isset($_COOKIE["email"])){ if($_COOKIE["name"] == "Root" || $_COOKIE["name"] == "root" || $_COOKIE["name"] == "admin" || $_COOKIE["name"] == "Admin") { ?>
				<div class="icons hide">
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
					<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-re">gn-icon-re <?php  countandecho($foo);?></span>
					<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-email">gn-icon-email <?php  countandecho($foo);?></span>
					<span class="col-md-5 col-md-offset-1 gn-icon gn-icon-tool">gn-icon-tool <?php  countandecho($foo);?></span>
					<img class="col-md-5 col-md-offset-1" src="img/background-abstract3.png"></img>
				</div>
				<?php }} ?>
				<?php if(isset($_COOKIE["email"])){ if($_COOKIE["name"] == "Root" || $_COOKIE["name"] == "root" || $_COOKIE["name"] == "admin" || $_COOKIE["name"] == "Admin") { ?>
				<div><a name="icon-help" class="btn-floating red valencia tooltipped waves-effect waves-light" data-position="top" data-delay="30" data-tooltip="ICON HELP"><i class="material-icons grey-text  text-lighten-2 gn-icon gn-icon-show"></i></a></div>
				<?php }} ?>
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
	<script src="js/back_to_top.js"></script>
	<?php include ("mediaq.php") ?>
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

$(document).on('click', '#login-open', function(event){
	event.stopPropagation();
	event.preventDefault();
	if(event.handled !== true) {
		Login.Show();
		event.handled = true;
	} else {
		return false;
	}
});
//Nascondiamo il login e il menu(per schermi <= 800) se si click fuori dalla form o dal botton
$(document).mousedown(function (e){
	//Login
	var container = $('#login-form');
	var btnLogin = $('#login-open');
	if (!container.is(e.target) && container.has(e.target).length === 0 && !btnLogin.is(e.target) && btnLogin.has(e.target).length === 0)
	Login.Remove();
	//Menu (per comodità uso le stessi variabili)
	container = $("#filter-menu");
	btnLogin = $("#liOpenMenu");
	if (btnLogin.length != 0 && !container.is(e.target) && container.has(e.target).length === 0 && !btnLogin.is(e.target) && btnLogin.has(e.target).length === 0)
	{
		container.hide();
		$("body").removeClass("overflow_hidden");
	}
});
$('#logout').on({click: function(){Login.LogOut();}});
$('#login-button').on({click: function(){Login.Try();}});
$('#salvaReg').on({click: function(){Singin.Try()}});
$('.register-button').on({click: function(){
//crea modale per registrazione
	$("#modalBoxRegister").show();
	$("#modalBoxRegister #modalReg").remove();
	if($(window).width() <= 800)
		$("#modalBoxRegister").append('<?php include("pages/regModalMobile.php");?>');
	else
		$("#modalBoxRegister").append('<?php include("pages/regModal.php");?>');
	$("#cancellaReg").click(function(){$("#modalBoxRegister").fadeOut("fast");});
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
	self.Riannota = function(){
		var myData = {link: $('#URL').val(), StartScrapper: "2"};
		var api = new API();
		api.chiamaServizio({requestUrl: 'pages/pageScrapper.php', data: myData, isAsync: true, loader: true, callback: function(str){
			readRDF.GetData(undefined, $('#URL').val());
			$("#cancella-ann").parent().show();
			$("#ri_ann").parent().hide();
			$("#filtri input[type='checkbox']:checked").each(function(){
				$(this)[0].checked = false;
				$(this).trigger("change");
			});
		}});
	}
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
			$('#filtri .check-boxs').parent().append("<div class='modalSmall' style='display:block' id='removeMePlease'>"+str+"</div>");
		}});
	}
	self.EnableCheckBox = function(){
		$('#removeMePlease').remove();
	}
	self.Uncheck = function(){
		$('.check-boxs input:checkbox').removeAttr('checked');
	}
	self.ChiSiamo = function(){
		var mainDiv = $("<div>").attr("id","aboutus").addClass("ann-details ann-shower modal purple wisteria").attr("style","display:block; width:70%;top:10%;")
					.append(
						$("<div>").addClass("commnet-desc modal-content")
						.append(
							$("<div>").addClass("row")
							.append($("<div>").addClass("col-md-12 center").append($("<img>").attr("src","img/logoRaschettoperspective.svg").attr("alt","logo").attr("style","width:55%;")))
							.append($("<div>").addClass("col-md-offset-7 col-md-5").append($("<h4>").text("by L.E.U.M")))
							.append($("<div>").addClass("col-md-12 center").append($("<h3>").text("Applicazione per l'annotazione semantica")))
							.append($("<div>").addClass("col-md-12")
								.append($("<h4>").text("Adesso puoi annotare articoli delle diverse riviste a disposizione e guardare quello che hanno fatto gli altri utenti."))
								.append($("<h4>").text("Realizzato dal team L.E.U.M. che ha come componenti ANTONIO LAGANÀ, FLORIN-CLAUDIU EPUREANU e ION URSACHI."))
							)
						)
					)
					.append($("<div>").addClass("commnet-user modal-footer").append($("<a>").addClass("btn waves-effect white purple-text text-wisteria").text("OK").on("click", function(){Scrap.HideModal()})));
		$("#modalBox").append(mainDiv).fadeIn();
	}
	self.Aiuto = function(){
		var api = new API();
		api.chiamaServizio({requestUrl: 'aiuto.php', isAsync: true, callback: function(str){
			$("#modalBox").append(str);
			$("#help .caption.right-align svg").attr('style', 'width:37em;');
			$('.slider').slider({full_width: true});
			$('.slider').slider("start");
			$("#modalBox").fadeIn();
		}});
	}
	return self;
}());

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
$(document).keyup(function(ev){
	//Se premuto ESC
    if(ev.keyCode == 27){
		//Se è visibile un qualsiasi modale
		if($(".modalBox").is(":visible")){
			if($("#cancellaReg").is(":visible"))
				//attendi 0.3 secondi prima di nascondere il modalBox, per far vedere l'animazione della form.
				setTimeout(function(){$(".modalBox").empty().hide();}, 300);
			else if($("#modalBoxView").is(":visible")){
				$("#view").empty();
				$(".modalBox").hide( "drop", { direction: "down" }, "slow" );
			}
			else
				$(".modalBox").empty().hide( "drop", { direction: "down" }, "slow" );
		}
	}
});
function ShowMenu(){
	if(($(window).width() >= 800) && !$('#filter-menu').is(":visible")){
		$('#filter-menu').show();
		$('.content2').removeClass("col-sm-12").addClass('col-sm-9 col-sm-offset-3');
	} else {
		if(!$("#liOpenMenu").is(":visible"))
		$("#liOpenMenu").show();
	}

	if(!$("#floating-menu").is(":visible"))
		$("#floating-menu").show();
}

$(document).ready(function(){
	//Caricamento menu
	readRDF.ReadGroups();
	readRDF.GetMenu();
	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal-trigger').leanModal();
	setTimeout(
		function(){
			$("#myLoader").fadeOut("fast", function(){$(this).removeClass("no-opacity")});
		}, 2000);
	//Caricamento Search per schermi sotto 800
	if($(window).width() <= 800)
	{
		$("#gn-menu li#liSearch").empty();
		$("#gn-menu li#liSearch").removeAttr("id").attr("id","liOpenMenu")
			.append($("<a>").addClass("large large-menu gn-icon gn-icon-menu grey-text text-lighten-2 waves-effect waves-light"))
			.on('click', function(){
				if(!$('#filter-menu').is(":visible")){
					$('#filter-menu').slideDown();
					$("body").addClass("overflow_hidden");
				}
				else{
					$('#filter-menu').slideUp();
					$("body").removeClass("overflow_hidden");
				}
			});
		//fai vedere nuovo search
		$("#libreria .doc-search").first().show();
		$("#libreria input[name='search']").attr("id","iptSearch").keypress(function(){if ( event.which == 13 ) {Page.Search()}});
	}
});
$('#login-open').click(function(){$('#dropdown1').attr('style', 'display:none')}); //fa sparire il dropdown 3dots quando clicco su accedi
$( "a[name='icon-help']" ).click(function() {
	/* Act on the event */
	$("div.icons").toggleClass( "hide" );
});
</script>
</html>
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
$('#login-button').on({click: function(){Login.Try();}});
$('#salvaReg').on({click: function(){Singin.Try()}});

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
			self.EnableCheckBox();
		}});
	};
	self.Riannota = function(){
		var myData = {link: $('#URL').val(), StartScrapper: "2"};
		var api = new API();
		api.chiamaServizio({requestUrl: 'pages/pageScrapper.php', data: myData, isAsync: true, loader: true, callback: function(str){
			$("#BUTTON_RIANNOTA").val("OK");
			readRDF.GetData(undefined, $('#URL').val());
			$("#cancella-ann").parent().show();
			$("#ri_ann").parent().hide();
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
		var mainDiv = $("<div>").attr("id","aboutus").addClass("ann-details ann-shower modal purple wisteria mCustomScrollbar ").attr("style","display:block; width:70%;top:10%;").attr('data-mcs-theme', 'minimal-dark')
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
		$("#modalBox").append(mainDiv);
		$("#aboutus .modale-content").mCustomScrollbar({
			axis:"y",
			theme:"minimal-dark"
		});
		$("#modalBox").fadeIn();
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
		$('.content2').removeClass("col-sm-12").addClass('col-sm-7 col-sm-offset-5 col-lg-9 col-lg-offset-3');
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
		$("#libreria input[name='search']").attr("id","iptSearch").keypress(function(){if ( event.which == 13 ) {Page.Search()}});
		$("#libreria label[name='searchlabel']").attr('for', 'iptSearch');
		$("#libreria .doc-search").first().show();
	}
});
$('#login-open').click(function(){$('#dropdown1').attr('style', 'display:none')}); //fa sparire il dropdown 3dots quando clicco su accedi
$( "a[name='icon-help']" ).click(function() {
	/* Act on the event */
	$("div.icons").toggleClass( "hide" );
});
$(document).ready(function(){cookie.MAIN()});

var cookie = (function(){
	var self = {};
	var no = "noCookie", yes = "yesCookie";
	self.MAIN = function(){
		self.Refresh();
		cookie.menu();
	}
	self.Refresh = function(){
		var name = no;
		if(getCookie("email") == "")
			name = yes;
		$("[name='"+name+"']").remove();
	}
	self.menu = function(){
		var floating_menu = "", signin_logout = "", accedi = "";
		if(getCookie("email") == ""){
			//Qui non sono logato
			signin_logout = '<li name="'+no+'"><a href="#modalReg" class="register-button gn-icon gn-icon-register grey-text text-darken-4 waves-effect modal-trigger"> Iscriviti</a></li>';
			accedi = '<li name="'+no+'" id="login-open"><a class="large gn-icon gn-icon-johnny-user large-menu grey-text  text-lighten-2 waves-effect waves-light">Accedi</a></li>';
			$("#dropdown1").append(signin_logout);
			$('.register-button').on({click: function(){
			//crea modale per registrazione
				$("#modalBoxRegister").show();
				$("#modalBoxRegister #modalReg").remove();
				if($(window).width() <= 800)
					$("#modalBoxRegister").append(self.load("pages/regModalMobile.php"));
				else
					{$("#modalBoxRegister").append(self.load("pages/regModal.php"));
						$("#modalBoxRegister .modal.modal-fixed-footer .modal-content ").mCustomScrollbar({
						axis:"y",
						theme:"minimal-dark"
					});
					}

				$("#cancellaReg").click(function(){$("#modalBoxRegister").fadeOut("fast");});
			}});
		}
		else
		{
			//Qui sono logato
			var display = "block";
			if($('#URL').val() == "")
				display = "none";
			floating_menu = '<div name="'+yes+'">\
								<div class="fixed-action-btn horizontal floating-menu" style="display:none" id="floating-menu-mod-pos">\
									<a id="mod_cancel" class="btn-floating red valencia tooltipped waves-effect waves-light" data-position="top" data-delay="30" data-tooltip="Annulla"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-den"></i></a>\
									<a id="mod_pos" class="btn-floating btn-large waves-effect waves-light green lighten-1 tooltipped" data-position="top" data-delay="30" data-tooltip="Salva Target"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-ann-succ"></i></a>\
								</div>\
								<div class="fixed-action-btn horizontal floating-menu" style="display:'+display+';" id="floating-menu">\
									<a class="btn-floating btn-large red valencia waves-effect waves-light">\
									  <i class="large gn-icon gn-icon-tool white-text  text-lighten-2"></i> \
									</a>\
									<ul>\
										<li><button id="ri_ann" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="Page.Riannota()" data-position="top" data-delay="30" data-tooltip="Ri-Annota Tutto"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-re"></i></button></li>\
										<li><button id="cancella-ann" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="Scrap.CancellaTutto()" data-position="top" data-delay="30" data-tooltip="Cancella Tutto"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-delete"></i></button></li>\
										<li><button id="view-ann" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="ViewAnnotation()" data-position="top" data-delay="30" data-tooltip="Guarda Cambiamenti"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-ann-see"></i></button></li>\
										<li><button id="annota" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="AnnotaClick()" data-position="top" data-delay="30" data-tooltip="Annota"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-ann-add"></i></button></li>\
									</ul>\
								</div>\
							</div>';
			signin_logout = '<li id="logout" name="'+yes+'"><a id="logoutjohnny" class="gn-icon gn-icon-ann-exit grey-text text-darken-4 waves-effect"> Esci</a></li>';
			accedi = '<li name="'+yes+'"><a id="ciaoatutti" href="#" class="grey-text text-lighten-2 large-menu waves-effect waves-light">Ciao ' + ellipsify(getCookie("name"), 10) + '</a></li>';
			$("#dropdown1").append(signin_logout);
			$("#floating_menu_fatherID").append(floating_menu);
			$('#logout').on({click: function(){Login.LogOut();}});
			readRDF.EnableRiannota($('#URL').val());
		}
		$("#ulAccedi").append(accedi);
	}
	self.load = function(link){
		var api = new API();
		return api.chiamaServizio({requestUrl: link, isAsync: false});
	}
	return self;
}());
<?php if(isset($_COOKIE["email"])){ ?>
<div class="fixed-action-btn horizontal floating-menu" style="display:none;" id="floating-menu-mod-pos">
	<a id="mod_cancel" class="btn-floating red valencia tooltipped waves-effect waves-light" data-position="top" data-delay="30" data-tooltip="Annulla"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-den"></i></a>
	<a id="mod_pos" class="btn-floating btn-large waves-effect waves-light green lighten-1 tooltipped" data-position="top" data-delay="30" data-tooltip="Salva Target"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-ann-succ"></i></a>
</div>
<div class="fixed-action-btn horizontal floating-menu" style="display:none;" id="floating-menu">
	<a class="btn-floating btn-large red valencia waves-effect waves-light">
	  <i class="large gn-icon gn-icon-tool white-text  text-lighten-2"></i> 
	</a>
	<ul>
		<li><button id="ri_ann" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="Page.Riannota()" data-position="top" data-delay="30" data-tooltip="Ri-Annota Tutto"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-re"></i></button></li>
		<li><button id="cancella-ann" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="Scrap.CancellaTutto()" data-position="top" data-delay="30" data-tooltip="Cancella Tutto"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-delete"></i></button></li>
		<li><button id="view-ann" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="ViewAnnotation()" data-position="top" data-delay="30" data-tooltip="Guarda Cambiamenti"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-ann-see"></i></button></li>
		<li><button id="annota" class="btn-floating red valencia tooltipped waves-effect waves-light" onclick="AnnotaClick()" data-position="top" data-delay="30" data-tooltip="Annota"><i class="material-icons white-text  text-lighten-2 gn-icon gn-icon-ann-add"></i></button></li>
	</ul>
</div>
<?php } ?>
<ul id="dropdown1" class="dropdown-content">
  <li><a class="grey-text text-darken-4 waves-effect gn-icon gn-icon-help" id="aAiuto">Aiuto</a></li>
  <li class="divider"></li>
  <li><a class="grey-text text-darken-4 waves-effect gn-icon gn-icon-about" id="aChiSiamo">Chi siamo</a></li>
  <li class="divider"></li>
  <?php if(!isset($_COOKIE["email"])){ ?>
  <li><a href="#modalReg" class="register-button gn-icon gn-icon-register grey-text text-darken-4 waves-effect modal-trigger"> Iscriviti</a></li>
  <?php } else { ?>
  <li id="logout"><a id="logoutjohnny" class="gn-icon gn-icon-ann-exit grey-text text-darken-4 waves-effect"> Esci</a></li>
  <?php } ?>
</ul>
<nav id="gn-menu"  class="navbar navbar-fixed-top gn-menu-main">
  <div class="container-fluid row">
  	<ul class="col s4">
  		<!-- search bar -->
    	<li id="liSearch">
	    	<div class="input-field">
		      <input id="iptSearch" type="search" placeholder="Cerca" required>
		      <label for="iptSearch"><i class="large material-icons" onclick="Page.Search();">search</i></label>
	        </div>
		</li>
  	</ul>
  	<ul class="col s1 push-s6">
		
		<!-- paper menu button activator -->
    	<li><a class="dropdown-button grey-text  text-lighten-2" data-activates="dropdown1"><i class="large material-icons">more_vert</i></a></li>
	</ul>
    <ul class="col s6 pull-s1">
		<!-- login button -->
    	<?php if(!isset($_COOKIE["email"])){ ?>
		<li  id="login-open"><a class="large gn-icon gn-icon-johnny-user large-menu grey-text  text-lighten-2 waves-effect waves-light">Accedi</a></li>
		
		<!-- profile button -->
		<?php } else { ?>
		<li><a id="ciaoatutti" href="#" class="grey-text text-lighten-2 large-menu waves-effect waves-light">Ciao <?php $out = strlen($_COOKIE["name"]) > 10 ? substr($_COOKIE["name"],0,10)."..." : $_COOKIE["name"]; echo $out; ?></a></li>
		<?php } ?>
		<!-- logo icon -->
    	<li id="logocontainer" class="center"><a href="#"class="logoraschetto">&nbsp;</a></li>
	</ul>
	<ul class="col s1"></ul>
  </div>
</nav>

<!--start-Login-Form-->
<div class="login-form initLogin" id="login-form">
	<div class="login">
		<div class="inset red valencia">
			<div class="login_2">
				<ul class="various-grid accout-login2 login_3 red valencia">
					<form>
						<li class="row" style="margin-bottom: 13%;">
							<div class="input-field  col-sm-12">
								<i class="material-icons prefix">account_circle</i>
								<input id="txtuser" type="email" class="validate">
								<label for="txtuser" data-error="Non è un indirizzo email valido">Email</label>
							</div>
						</li>
						<li class="row">
							<div class="input-field col-sm-12">
								<i class="material-icons prefix">vpn_key</i>
						        <input id="txtpass" type="password" class="validate">
						        <label for="txtpass">Password</label>
					        </div>
						</li>
					</form>
				</ul>
			</div>
			<div class="row" style="padding-top: 5% ; padding-bottom: 5%;">
				<div class="col-sm-6 col-sm-push-6 center">
					<a href="#modalReg" class="modal-trigger register-button btn waves-effect waves-red white red-text text-valencia" id="register-button-modal">Iscriviti</a>
				</div>
				<div class="col-sm-offset-1 col-sm-5 col-sm-pull-6 center">
					<button id="login-button" class="btn waves-effect waves-light red valencia translucent white-text">Accedi</button> 
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
$('#aAiuto').on({click: function(){Page.Aiuto()}});
$('#aChiSiamo').on({click: function(){Page.ChiSiamo()}});
// $( window ).ready(
// 	function (){
// 		var screenwidth =$( window ).width();
// 		if (screenwidth <=1023) {
// 			$(".content2").removeClass().addClass("content2 col-md-12")
// 		}
// 		if (screenwidth <=643) {
// 			$("#annota").empty();
// 			$("#view-ann").empty();
// 			$("#filter").empty();
// 			$("#loginjohnny").empty();
// 			$("#logoutjohnny").empty();
// 		};
// 		$( window ).resize(function() {
// 			screenwidth =window.innerWidth;
// 			if (screenwidth <=1023) {
// 				$(".content2").removeClass().addClass("content2 col-xs-12")
// 			}
// 			else {
// 				$(".content2").removeClass().addClass("content2 col-md-offset-4 col-md-8")
// 			}
// 			if (screenwidth <=689) {
// 				$("#annota").empty();
// 				$("#view-ann").empty();
// 				$("#filter").empty();
// 				$("#loginjohnny").empty();
// 				$("#logoutjohnny").empty();
// 			}
// 			else{
// 				$("#annota").text("ANNOTA");
// 				$("#view-ann").text("GUARDA CAMBIAMENTI");
// 				$("#filter").text("FILTRO");
// 				var CookieSet = getCookie("name");
// 				if (CookieSet == "") {
// 					$("#loginjohnny").text("Login");
// 				}
// 				else {
// 					$("#logoutjohnny").text("Logout, " + CookieSet);
// 				};
// 			}

// 		});

// 	});
</script>

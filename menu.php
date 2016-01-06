<?php if(isset($_COOKIE["email"])){ ?>
<div class="fixed-action-btn horizontal click-to-toggle floating-menu">
	<a id="mod_pos" class="btn-floating btn-large waves-effect waves-light green lighten-1 tooltipped" style="display:none;" data-position="top" data-delay="30" data-tooltip="Salva Target"><i class="material-icons grey-text  text-lighten-2 codrops-icon codrops-icon-ann-add"></i></a>
</div>
<div class="fixed-action-btn horizontal click-to-toggle floating-menu">
	<a class="btn-floating btn-large red darken-2 waves-effect waves-light">
	  <i class="large codrops-icon codrops-icon-ann-see grey-text  text-lighten-2"></i>
	</a>
	<ul>	  
	  <!-- <li><a class="btn-floating red darken-2 tooltipped waves-effect waves-light" data-position="top" data-delay="30" data-tooltip="I am tooltip"><i class="material-icons grey-text  text-lighten-2">format_quote</i></a></li> -->
	  <li><a id="view-ann" class="btn-floating red darken-2 tooltipped waves-effect waves-light" onclick="ViewAnnotation()" data-position="top" data-delay="30" data-tooltip="Guarda Cambiamenti"><i class="material-icons grey-text  text-lighten-2 codrops-icon codrops-icon-ann-see"></i></a></li>
	  <li><a id="annota" class="btn-floating red darken-2 tooltipped waves-effect waves-light" onclick="AnnotaClick()" data-position="top" data-delay="30" data-tooltip="Annota"><i class="material-icons grey-text  text-lighten-2 codrops-icon codrops-icon-ann-add"></i></a></li>
	</ul>
</div>
<?php } ?>
<ul id="dropdown1" class="dropdown-content">
  <li><a class="grey-text text-darken-4 waves-effect">Aiuto</a></li>
  <li class="divider"></li>
  <li><a class="grey-text text-darken-4 waves-effect">Chi siamo</a></li>
  <li class="divider"></li>
  <?php if(!isset($_COOKIE["email"])){ ?>
  <li><a class="register-button codrops-icon codrops-icon-ann-exit grey-text text-darken-4 waves-effect"> Registrati</a></li>
  <?php } else { ?>
  <li id="logout"><a id="logoutjohnny" class="codrops-icon codrops-icon-ann-exit grey-text text-darken-4 waves-effect"> Esci</a></li>
  <?php } ?>
</ul>
<nav id="gn-menu"  class="navbar navbar-fixed-top gn-menu-main">
  <div class="container-fluid">
  	<ul class="col-sm-3 col-sm-offset-1">
  		<!-- search bar -->
    	<li class="gn-search-item">
	    	<div class="input-field">
		      <input id="iptSearch" type="search" placeholder="Cerca" required>
		      <label for="iptSearch"><i class="large material-icons" onclick="Page.Search();">search</i></label>
	        </div>
		</li>
  	</ul>
  	<ul class="col-sm-1 col-sm-push-7">
		
		<!-- paper menu button activator -->
    	<li><a class="dropdown-button grey-text  text-lighten-2" data-activates="dropdown1"><i class="large  material-icons right">more_vert</i></a></li>
	</ul>
    <ul class="col-sm-7 col-sm-pull-1 right">
		<!-- login button -->
    	<?php if(!isset($_COOKIE["email"])){ ?>
		<li  id="login-open" class="right"><a id="loginjohnny" class="large codrops-icon codrops-icon-johnny-user login-open grey-text  text-lighten-2 waves-effect waves-light">Accedi</a></li>
		
		<!-- profile button -->
		<?php } else { ?>
		<li class="right"><a href="#" class="login-open grey-text  text-lighten-2 waves-effect waves-light">Ciao <?php echo $_COOKIE["name"]; ?></a></li>
		<?php } ?>
		<!-- logo icon -->
    	<li class="center"><a href="#"class="logoraschetto">&nbsp;</a></li>
    	
	
      <!-- 
	<?php// if(isset($_COOKIE["email"])){ ?>
	<?php //} ?>
	<li id="filter-list">
		<a class="gn-icon gn-icon-ann-wrapper-mobile"><button id="filter" class="codrops-icon codrops-icon-ann-filter" onclick="ToggleFilter()">FILTRO</button></a>
	</li>
	<?php// if(isset($_COOKIE["email"])){ ?>

	<?php// } ?>
	<?php// if(!isset($_COOKIE["email"])){ ?>
	<li  id="login-open">
		<a id="loginjohnny"class="codrops-icon codrops-icon-johnny-user login-open">Login</a>
	</li>
	<?php// } else { ?>
	<li  id="logout">
		<a id="logoutjohnny" class="codrops-icon icon-fontawesome-exit ">Logout, <?php //echo $_COOKIE["name"]; ?></a>
	</li>

	<?php //} ?> -->
        <!-- <li class="gn-trigger">
		<a class="gn-icon gn-icon-menu" id="MenuTrigger"><span></span></a>
		<nav class="allow-scroll gn-menu-wrapper">
			<div class="gn-scroller mCustomScrollbar" data-mcs-theme="minimal-dark">
				<ul class="gn-menu" id = "mainMenu">
					<li class="gn-search-item">
						<input placeholder="Cerca" type="search" class="gn-search" id="iptSearch">
						<a class="gn-icon gn-icon-search" href="#" onclick="Page.Search();"></a>
					</li>
					<li>
						<a class="gn-icon gn-icon-lib" onclick="ToggleSibling(this)">Libreria</a>
						<ul class="gn-submenu doc-annotati"style="display:none;">
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</li> -->
	</ul>
  </div>
</nav>


<!--start-Login-Form-->
<div class="login-form initLogin" id="login-form">
	<div class="login">
		<div class="inset">

			<div class="login_1 login_2">
				<ul class="various-grid accout-login2 login_3">
					<form>
						<li>
							<input type="text" class="text" placeholder="E-mail" id="txtuser">
							<a class="icon user">
							</a>
						</li>
						<li>
							<input type="password" placeholder="Password" id="txtpass">
							<a class="icon lock">
							</a>
						</li>
					</form>
				</ul>
			</div>
			<div class="sign">
				<div class="submit">
					<input class="azzuro azzuro1" type="button" value="Login" id="login-button">
					<input class="azzuro azzuro2 register-button" type="button" value="Register" id="register-button-modal">
				</div>
				<div class="clear"> </div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
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

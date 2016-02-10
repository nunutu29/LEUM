
<div id="floating_menu_fatherID">
</div>

<ul id="dropdown1" class="dropdown-content">
  <li><a class="grey-text text-darken-4 waves-effect gn-icon gn-icon-help" id="aAiuto">Aiuto</a></li>
  <li class="divider"></li>
  <li><a class="grey-text text-darken-4 waves-effect gn-icon gn-icon-about" id="aChiSiamo">Chi siamo</a></li>
  <li class="divider"></li>
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
    <ul class="col s6 pull-s1" id="ulAccedi">
		<!-- login button -->
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
</script>

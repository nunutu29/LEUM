<div id="modalReg" class="ann-details ann-shower modal modal-fixed-footer purple wisteria" style="display: block;">\
	<div class="commnet-desc modal-content">\
		<form>\
			<div class="row">\
				<div class="col-md-12 center">\
					<img src="img/logoRaschettoperspective.svg" alt="logo" style="width: 55%;">\
				</div>\
				<div class="col-md-12 center" style="margin-bottom: -5%;">\
					<h2 >Crea un account</h2>\
				</div>\
				<div class="input-form col-md-offset-3 col-md-6">\
					<div class="input-field">\
						<i class="gn-icon gn-icon-username prefix">&nbsp;</i>\
						<input id="newname" type="text" class="validate">\
						<label for="newname">Nome e Cognome</label>\
					</div>\
					<div class="input-field">\
						<i class="gn-icon gn-icon-password prefix">&nbsp;</i>\
						<input id="newpass" type="password" class="validate">\
						<label for="newpass">Password</label>\
					</div>\
					<div class="input-field">\
						<i class="gn-icon gn-icon-password prefix">&nbsp;</i>\
						<input id="newconfpass" type="password">\
						<label for="newconfpass" data-error="Le tue password non corrispondono" data-success="Le tue password corrispondono">Conferma Password</label>\
					</div>\
					<div class="input-field">\
						<i class="gn-icon gn-icon-email prefix">&nbsp;</i>\
						<input id="newemail" type="email" class="validate">\
						<label for="newemail" data-error="Non è un indirizzo email valido">Email</label>\
					</div>\
				</div>\
				<div class="col-md-3">&nbsp;</div>\
				<div class="col-md-12 center">\
					<span id="erroremail" class="gn-icon gn-icon-ann-ex gn-icon-regalert"> E-mail già registrato. Prova con una nuova</span>\
				</div>\
			</div>\
		</form>\
	</div>\
	<div class="commnet-user">\
		<div class="row">\
			<div class="col-md-offset-3 col-md-3">\
				<a id="salvaReg" class="btn waves-effect waves-teal white purple-text text-wisteria" onclick="Singin.Try()">Iscriviti</a>\
			</div>\
			<div class="col-md-3">\
				<a id="cancellaReg" class="btn-flat waves-effect white-text">Annulla</a>\
			</div>\
			<div class="col-md-3">&nbsp;</div>\
		</div>\
	</div>\
</div>	\
</div>
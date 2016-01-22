<div id="modalReg" class="modal bottom-sheet">\
    <div class="modal-content">\
      <div class="header ">\
        <div style="width: 50%;float: left;">\
          <h4>Crea un account</h4>      \
        </div>\
        <div style="width: 25%;float: left;">\
          <a id="salvaReg" class="btn-flat waves-effect waves-teal green-text gn-icon gn-icon-accept" onclick="Singin.Try()"></a>\
        </div>\
        <div style="width: 25%;float: left;">\
          <a id="cancellaReg" class="btn-flat waves-effect waves-red red-text gn-icon gn-icon-den modal-action modal-close"></a>\
        </div>\
      </div>\
      <div class="modal-footer">\
        <form>\
        <div class="row">\
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
    </div>\
  </div>
function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
};
function clientreg(){
	$("input[id=newemail]").change(function() {
		if ($("#newemail").val() == "") {
			if ($("#newemail").hasClass('invalid')) $("#newemail").removeClass('invalid');
			if ($("#newemail").hasClass('valid')) $("#newemail").removeClass('valid');
			if ($("#newemail").hasClass('blanck')) $("#newemail").removeClass('blanck');
		} else {
			if ($("#newemail").hasClass('blanck')) $("#newemail").removeClass('blanck'); };
	});
	$("input[id=newname]").change(function() {
		if ($("#newname").val() == "") {
			if ($("#newname").hasClass('invalid')) $("#newname").removeClass('invalid');
			if ($("#newname").hasClass('valid')) $("#newname").removeClass('valid');
			if ($("#newname").hasClass('blanck')) $("#newname").removeClass('blanck');
		} else {
			if ($("#newname").hasClass('blanck')) $("#newname").removeClass('blanck'); };
	});
	$("input[id=newpass]").change(function() {
		if ($("#newpass").val() == "") {
			if ($("#newpass").hasClass('invalid')) $("#newpass").removeClass('invalid');
			if ($("#newpass").hasClass('valid')) $("#newpass").removeClass('valid');
			if ($("#newpass").hasClass('blanck')) $("#newpass").removeClass('blanck');
		} else {
			if ($("#newpass").hasClass('blanck')) $("#newpass").removeClass('blanck'); };
	});
	$("input[id=newconfpass]").change(function() {
		if ($("#newconfpass").val() != "") {
			if ($("input[id=newconfpass]").val() != $("#newpass").val()) {
				if ($("#newconfpass").hasClass('blanck')) $("#newconfpass").removeClass('blanck');
				if ($("#newconfpass").hasClass('valid')) $("#newconfpass").removeClass('valid');
				$("#newconfpass").addClass('invalid');
			} else {
				if ($("#newconfpass").hasClass('blanck')) $("#newconfpass").removeClass('blanck');
				if ($("#newconfpass").hasClass('invalid')) $("#newconfpass").removeClass('invalid');
				$("#newconfpass").addClass('valid');
			};
		} else {
			if ($("#newconfpass").hasClass('blanck')) $("#newconfpass").removeClass('blanck');
			if ($("#newconfpass").hasClass('invalid')) $("#newconfpass").removeClass('invalid');
			if ($("#newconfpass").hasClass('valid')) $("#newconfpass").removeClass('valid');
		};
	});
	$("input[id=newpass]").change(function() {
		if ($("#newconfpass").val() != "") {
			if ($("input[id=newconfpass]").val() != $("#newpass").val()) {
				if ($("#newconfpass").hasClass('valid')) $("#newconfpass").removeClass('valid');
				$("#newconfpass").addClass('invalid');
			} else {
				if ($("#newconfpass").hasClass('invalid')) $("#newconfpass").removeClass('invalid');
				$("#newconfpass").addClass('valid');
			};
		} else {
			if ($("#newconfpass").hasClass('invalid')) $("#newconfpass").removeClass('invalid');
			if ($("#newconfpass").hasClass('valid')) $("#newconfpass").removeClass('valid');
		}
	});
};
$( document ).ready(function(){DetectChange();clientreg()});
function DetectChange(){
	$("#newname").change(function(){
		HideErrorReg()
	});
	$("#newpass").change(function(){
		HideErrorReg()
	});
	$("#newconfpass").change(function(){
		HideErrorReg()
	});
	$("#newemail").change(function(){
		HideErrorReg()
	});
}
function HideErrorReg (){
	$("#erroremail").fadeOut('fast');
};
var Singin = (function (){
	var self = {};
	self.Try = function(){
		var pData = {
			newname: document.getElementById('newname').value,
			newpass: document.getElementById('newpass').value,
			newconfpass:document.getElementById('newconfpass').value,
			newemail:document.getElementById('newemail').value
		};
		if(pData.newname.trim().length == 0 || pData.newpass.trim().length == 0 || pData.newconfpass.trim().length == 0 || pData.newemail.trim().length == 0){
			$("#erroremail").text(" I campi non possono essere vuoti");$("#erroremail").slideDown();
			if ($("#newemail").val() == "") {
				if ($("#newemail").hasClass('valid')) $("#newemail").removeClass('valid');
				if ($("#newemail").hasClass('invalid')) $("#newemail").removeClass('invalid');
				if (!$("#newemail").hasClass('blanck')) $("#newemail").addClass('blanck'); };
			if ($("#newname").val() == "") {
				if ($("#newname").hasClass('valid')) $("#newname").removeClass('valid');
				if ($("#newname").hasClass('invalid')) $("#newname").removeClass('invalid');
				if (!$("#newname").hasClass('blanck')) $("#newname").addClass('blanck'); };
			if ($("#newpass").val() == "") {
				if ($("#newpass").hasClass('valid')) $("#newpass").removeClass('valid');
				if ($("#newpass").hasClass('invalid')) $("#newpass").removeClass('invalid');
				if (!$("#newpass").hasClass('blanck')) $("#newpass").addClass('blanck'); };
			if ($("#newconfpass").val() == "") {
				if ($("#newconfpass").hasClass('valid')) $("#newconfpass").removeClass('valid');
				if ($("#newconfpass").hasClass('invalid')) $("#newconfpass").removeClass('invalid');
				if (!$("#newconfpass").hasClass('blanck')) $("#newconfpass").addClass('blanck'); };

		}
		else{
			if( !isValidEmailAddress(pData.newemail.trim()) ) { $("#erroremail").text(" Ci sono presenti dei campi errati");$("#erroremail").slideDown();
				$("#newemail").addClass('invalid'); }
			else{
				if (pData.newpass == pData.newconfpass) {
					var api =  new API();
					var risposta = api.chiamaServizio({requestUrl: "pages/register.php", data: pData});
					if(risposta.trim() == ""){
						Login.Try(true, pData.newemail, pData.newpass);
						location.reload();
					}
					else 
						alert(risposta);
				}
				else{
					$("#erroremail").text(" Ci sono presenti dei campi errati");$("#erroremail").slideDown();
					$("#newconfpass").addClass('invalid'); }
			}
		}
		return;
	};
	return self;
}());
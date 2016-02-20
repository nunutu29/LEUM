function ToogleSlideCitazione(){
	var elemen = document.getElementById("label-gn-icon-open-main-cites");
	classie.toggle(elemen, 'gn-icon-opendown');
	classie.toggle(elemen, 'gn-icon-openup');
	$("#cites-checkbox").slideToggle('fast');
}
function ToogleSlideRetorica(){
  var elemen = document.getElementById("label-gn-icon-open-main-retoric");
  var elemen2 = document.getElementById("retoric-checkbox");
  classie.toggle(elemen, 'gn-icon-opendown');
  classie.toggle(elemen, 'gn-icon-openup');
  $("#retoric-checkbox").slideToggle('fast');
}
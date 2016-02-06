function ellipsify(str, sizebox) {
	if (typeof sizebox === "undefined" || sizebox === null) { 
    sizebox = 43; 
  	};
    if (str.length > sizebox) {
        return (str.substring(0, sizebox) + "...");
    }
    else {
        return str;
    };
};
var Login = (function (){
	var self = {};
	self.toggle = function (){
		var loginForm = document.getElementById('login-form');
		classie.toggle(loginForm, 'initLogin');
		classie.toggle(loginForm, 'changeLogin');
	};
	self.Remove = function (){
		var loginForm = document.getElementById('login-form');
		if(classie.has(loginForm, 'changeLogin')){
			classie.remove(loginForm, 'changeLogin');
			classie.add(loginForm, 'initLogin');
		}
	};
	self.Show = function (){
		var loginForm = document.getElementById('login-form');
		if(classie.has(loginForm, 'initLogin')){
			classie.remove(loginForm, 'initLogin');
			classie.add(loginForm, 'changeLogin');
		}
	};
	self.Try = function(ok, user, pass){
		ok = ok || false;
		var pData = {};
		if(!ok)
			pData = {
				user: document.getElementById('txtuser').value,
				password: document.getElementById('txtpass').value
			}
		else
			pData = {
				user: user,
				password: pass
			}
		if(pData.user.trim().length == 0) alert("Username can't be blank.");
		else{
			if(pData.password.trim().length == 0) alert("Password can't be blank.");
			else{
				var api = new API();
				var risposta = api.chiamaServizio({requestUrl: "pages/login.php?user="+pData.user+"&password="+pData.password, methodType: "GET"});
				 if(risposta.trim() == "")
				 	location.reload();
				 else alert(risposta);

			}
		}
		return;
	}
	self.LogOut = function(){
		window.location="pages/logout.php";
	}
	return self;
}());

var Scrap = (function(){
	var self = {};
	self.ShowArray = function(what, chk, index){
		index = index || 0;
		var id = what + index;
		if(chk.checked){
		what = self.Decode(what);
		var content = self.Execute(what, true, index);
		var content2 = self.GetNew(what, index);
		/*Qui leggere anche le annotazioni dei gruppi selezionati*/
		var content3 = self.Groups.ReadSingle(what, index);
		
		if(content2 != null) content = content.concat(content2);
		if(content3 != null) content = content.concat(content3);
		if (content != null && content != undefined)
			for(var i = 0; i< content.length; i++)
				if(content[i] != null){
					self.Highlight(content[i], self.CheckID(id));
				}
		}
		else
			self.Remove(self.CheckID(id), ".");
	}
	self.GetList = function(el){
		var mainJson = sessionStorage.getItem("annotation");
		var ann = sessionStorage.getItem('ann');
		var FullList = [];
		mainJson = JSON.parse(mainJson).results.bindings;
		
		if(typeof ann == "object") ann = [ann];
		else
		{
			ann = ann.replace(/\|/g, ",");
			ann = "[" + ann + "]";
			ann = JSON.parse(ann);
		}
		for(var i = 0; i< mainJson.length; i++)
		{
			if(el.id.value == mainJson[i].id.value && el.start.value == mainJson[i].start.value && el.end.value ==  mainJson[i].end.value){
				var annotation = null;
				if((annotation = self.CheckAnnotation(mainJson[i])) != null)
					FullList.push(annotation);
			}
		}
		for(var i = 0; i < ann.length; i++)
		{
			if(el.id.value == ann[i].id.value && el.start.value == ann[i].start.value && el.end.value == ann[i].end.value){
				if(ann[i].azione.value != "D")
					FullList.push(ann[i]);
			}
		}
		$("#ListaGruppi input[type='checkbox']:checked").each(function(){
			var GroupJson = sessionStorage.getItem('ann'+$(this).attr('id'));
			if(GroupJson == null || GroupJson == "") return;
			GroupJson = JSON.parse(GroupJson).results.bindings;
			for(var i = 0; i < GroupJson.length; i++)
				if(el.id.value == self.GetMyID(GroupJson[i].id.value) && el.start.value == GroupJson[i].start.value && el.end.value == GroupJson[i].end.value){
					GroupJson[i].gruppo = $(this).attr('id'); 
					FullList.push(GroupJson[i]);
			}
		});
		return FullList;
	}
	self.GetNew = function(what, index){
		var ann = sessionStorage.getItem('ann');
		if(ann == undefined || ann == "") return null;
		var control = "ver1";
		if(index != 0) control = "cited";

		if(typeof ann == "object") ann = [ann];
		else{
			ann = ann.replace(/\|/g, ",");
			ann = "[" + ann + "]";
			ann = JSON.parse(ann);
		}
		var arr = [];
		for(var i = 0; i < ann.length; i++){

			if(self.CheckRet(what))
			{
				//Se Retorica fai questo
				if(ann[i].predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes" && ann[i].object.value == what && ann[i].azione.value != 'D')
					arr.push(ann[i]);
			}
			else{
				if(ann[i].predicate.value == what && what == "http://purl.org/dc/terms/creator" && ann[i].azione.value != 'D' && ann[i].subject.value.slice(-8).indexOf("cited") == -1 && control != "cited")
					arr.push(ann[i]);
				else
					if(ann[i].predicate.value == what && what == "http://schema.org/comment")
						arr.push(ann[i]);
					else
						if(ann[i].predicate.value == what && ann[i].azione.value != 'D' && ann[i].subject.value.slice(-8).indexOf(control) != -1)
							arr.push(ann[i]);
			}
		}
		return arr.length == 0 ? null : arr;
	};
	self.Execute = function(what, array, index){
		var json = JSON.parse(sessionStorage.getItem('annotation'));
		if(json == null) return;
		var control = "ver1";
		if(index != 0) control = "cited";
		return self.GetArray(json.results.bindings, what, control);
	}
	self.GetArray = function(from, what, control){
		var array = [];
		for(var i = 0; i< from.length; i++){
			if(self.CheckRet(what))
			{	//Se Retorica fai questo
				if(from[i].predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes" && from[i].object.value == what)
					array.push(self.CheckAnnotation(from[i]));
			}
			else
			{
				if(from[i].predicate.value == what && what == "http://purl.org/dc/terms/creator" && from[i].subject.value.slice(-8).indexOf("cited") == -1 && control != "cited")
					array.push(self.CheckAnnotation(from[i]));
				else
					if(from[i].predicate.value == what && what == "http://schema.org/comment")
						array.push(self.CheckAnnotation(from[i]));
					else
						if(from[i].predicate.value == what && from[i].subject.value.slice(-8).indexOf(control) != -1)
							array.push(self.CheckAnnotation(from[i]));
			}
		}
		return array;
	}
	self.Remove = function(id, symbol){ //symbol dev'essere "." per eliminare tutti, name per nome
		if (id == undefined) return;
		var span = undefined;
		var EyeSpan = undefined;
		switch(symbol){
			case ".":
				span = $("span." + self.CheckID(id));
				EyeSpan = $("span.gn-icon-show." + self.CheckID(id));
			break;
			case "name":
				span = $("span[name='" + id + "']");
				EyeSpan = $("span.gn-icon-show[name='" + id + "']");
				id = EyeSpan[0].classList[0];
			break;
		}
		if(span == undefined) return;
		span.each(function(){
			if(this.classList.length == 3){
				if(this.classList.contains("annotation") && this.classList.contains("annotation-overlap")){
					$(this).contents().unwrap();
				}
			}
			else
			{
				if(this.classList.length > 3){
					$(this).removeClass(id);
					//$(this).removeAttr("name");
					$(this).attr("name", $.data(document.body, $(this).attr("name")))
					if(this.classList.length == 3)
						if(this.classList.contains("annotation") && this.classList.contains("annotation-overlap")){
							$(this).removeClass("annotation-overlap");
							$(this).removeAttr("style");
						}
				}
				else{
					$(this).contents().unwrap();
				}
			}
		});
		EyeSpan.remove();
	}
	self.Highlight = function(annotation, style){
	  var gruppo = "";
	  if(annotation.gruppo != undefined && annotation.gruppo != null)
		  gruppo = annotation.gruppo.value;
	  annotation.id.value = self.GetMyID(annotation.id.value);
	  var target_xpath = '//*[@id="' + annotation.id.value + '"]';//Prendi l'elemento
	  var target_node =$(document.evaluate(target_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
	  var ann_start = annotation.start.value;
	  var ann_end = annotation.end.value;

	  var count = 0;
	  function uniqueID() {
		  function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			  .toString(16)
			  .substring(1);
		  }
		  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
		}
	  var guid = uniqueID();
	  var span = $(document.createElement("span")).addClass(style).addClass('gn-icon-show').attr("name", guid);
	  var spanData = {
		  id:{value:annotation.id.value}, 
		  start:{value:annotation.start.value}, 
		  end:{value:annotation.end.value}
	  };
	  span.attr("data-info", JSON.stringify(spanData));
	  span.attr("onclick", "Scrap.OnClick(this); return false;");
	  wrap_node(target_node);
	  function wrap_node(node) {
		$(node).contents().each(function() {
		  if (this.nodeType == 3) { // Text node
			var text = $(this).text();
			if (count >= ann_end) return; // Se l'annotazione è finita passa al nodo successivo
			if ((count + text.length) <= ann_start || text.trim() == "") { // Se l'annotazione non inizia in questo nodo (o non è già iniziata), incrementa il counter e passa al nodo successivo
			  count += text.length;
			  return;
			}
			var start_wrap = 0;
			var end_wrap = -1;
			
			if (count < ann_start) // Se l'annotazione inizia in questo nodo
				start_wrap = ann_start-count;

			if ((count + text.length) > ann_end) // Se l'annotazione finisce in questo nodo
				end_wrap = ann_end-count;

			var parent = this.parentNode;
			if (parent.nodeType == 1 && parent.classList.contains('annotation')) { // Il parent è lo span di un'altra annotazione
			  var wrap_mid = $(parent);

			  var ann_target = [];

			  if (start_wrap > 0) {
				var wrap_left = $("<span>");
				wrap_left.attr('class', $(parent).attr('class'));
				wrap_left.attr('name', $(parent).attr('name'));
				wrap_left.css('background', $(parent).css('background'));
				wrap_left.text(text.slice(0,start_wrap));
				wrap_mid.before(wrap_left);
			  }

			  if (end_wrap != -1) {
				var wrap_right = $("<span>");
				wrap_right.attr('class', $(parent).attr('class'));
				wrap_right.attr('name', $(parent).attr('name'));
				wrap_right.css('background', $(parent).css('background'));
				wrap_right.text(text.slice(end_wrap));
				wrap_mid.after(wrap_right);
				wrap_mid.text(text.slice(start_wrap,end_wrap));
			  }
			  else {
				  var old_Span = "";
				  $(wrap_mid.find(".gn-icon-show")).each(
					function(){
						if($(this).attr("data-info") != span.attr("data-info")){
							if(old_Span == "")
								old_Span = $(this);
							else
								old_Span.after($(this));
						}
					}
				  );
				  
				wrap_mid.text(text.slice(start_wrap));
				wrap_mid.append(old_Span);
			  }

			  if (!wrap_mid.hasClass(style)) wrap_mid.addClass(style);
			  if (!wrap_mid.hasClass('annotation-overlap')) wrap_mid.addClass('annotation-overlap');

			  var rgba_array = [];
			  var gradient = '';
			  for (i = 0; i < parent.classList.length; ++i) {
				var color = self.getStyle(parent.classList[i]);
				if (color != null)
					rgba_array.push(color);
			  }
			  if(rgba_array.length > 0)
				gradient = "to bottom, " + rgba_array[0] + " 0%, " + rgba_array[rgba_array.length-1] + " 100%";
			
			  wrap_mid.css('background', 'linear-gradient('+gradient+')');
			  wrap_mid.append(span.attr('style', 'background: none'));
			  if(wrap_mid.attr("name") != undefined && wrap_mid.attr("name") != null)
				$.data(document.body, guid, wrap_mid.attr("name"));
			  wrap_mid.attr("name", guid)
			}
			else {
			  var wrap_element = $("<span class='annotation "+style+"'></span>");
			  wrap_element.attr("name", guid)
			  $(this).replaceWith(wrap_element);

			  if (start_wrap > 0)
			  wrap_element.before(text.slice(0,start_wrap));

			  if (end_wrap > 0) { // L'annotazione finisce in questo nodo
				wrap_element.text(text.slice(start_wrap,end_wrap));
				wrap_element.after(text.slice(end_wrap));
			  }
			  else
				wrap_element.text(text.slice(start_wrap));
			  wrap_element.append(span);
			}
			count += text.length;
		  }
		  else {
			wrap_node(this);
		  }
		});
	  }
	}
	self.Check = function(doc, pers){
		doc = doc || "";
		pers = pers || "";
			if(Normalize(doc.substring(0,5)) == pers.substring(0,5))
				return 0;
			else
				return 1;
	};
	self.OnClick = function(arg){
		$(arg).attr('id', 'OpenedSpan');
		var el = $(arg).attr('data-info');
		var idToRem = $(arg).attr('name');
		el = JSON.parse(el);
		var elements = self.GetList(el);
		var father = $('#modalBox');
		var Mainbox = $(document.createElement('div')).attr("id", "CarouselViewMain").addClass("ann-details ann-shower").attr("style","display:block;");
		var CarouselView = $(document.createElement('div')).attr("id","CarouselView").addClass("carousel slide").attr("data-interval","false")
		var CarouselInner = $(document.createElement('div')).addClass("carousel-inner").attr("role","listbox");
		var box = "";
		
		for(var i = 0; i < elements.length; i++){
			switch(elements[i].predicate.value){
				case "http://purl.org/dc/terms/title":
					box = self.CreateBox(elements[i], 'gn-icon-ann-title', idToRem, i);
				break;
				case "http://purl.org/dc/terms/creator":
					box = self.CreateBox(elements[i], 'gn-icon-ann-autore', idToRem, i);
				break;
				case "http://prismstandard.org/namespaces/basic/2.0/doi":
					box = self.CreateBox(elements[i], 'gn-icon-ann-doi', idToRem, i);
				break;
				case "http://purl.org/spar/fabio/hasPublicationYear":
					box = self.CreateBox(elements[i], 'gn-icon-ann-annop', idToRem, i);
				break;
				case "http://purl.org/spar/fabio/hasURL":
					box = self.CreateBox(elements[i], 'gn-icon-ann-url', idToRem, i);
				break;
				case "http://schema.org/comment":
					box = self.CreateBox(elements[i], 'gn-icon-ann-commento', idToRem, i);
				break;
				case "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes":
					box = self.CreateBox(elements[i], 'gn-icon-ann-retorica', idToRem, i);
				break;
				case "http://purl.org/spar/cito/cites":
					box = self.CreateBox(elements[i], 'gn-icon-ann-cites', idToRem, i);
				break;
			}
			CarouselInner.append(box);
		}
		CarouselView.append(CarouselInner);
		CarouselView.append($("<a>").addClass("clean-arrow left carousel-control").attr("href","#CarouselView").attr("role", "button").attr("data-slide","prev")
							.append($("<span>").addClass("gn-icon gn-icon-arrow-left").attr("aria-hidden","true")));
		CarouselView.append($("<a>").addClass("clean-arrow right carousel-control").attr("href","#CarouselView").attr("role", "button").attr("data-slide","next")
							.append($("<span>").addClass("gn-icon gn-icon-arrow-right").attr("aria-hidden","true")));
		Mainbox.append(CarouselView);
		father.append(Mainbox);
		father.fadeIn('fast');
	};
	self.CreateBox = function(el, icon, idToRemove, index){
		var active = index == 0 ? " active" : "";
		var annotator = "";
		var label = "";
		var boxID = "boxData-" + index;
		var box = $(document.createElement('div')).addClass("item modal purple wisteria" + active).attr("id", boxID);
		
		//Estrazione Autore dell'annotazione
		if(el.name == undefined)
			annotator = " da anonymus ";
		else
			annotator = el.email.value == "http://server/unset-base/anonymus" ? " da anonymus " : " da " + el.name.value;
		//Estrazione label da mostrare
		try{
			label = el.bLabel.value;
		}catch(e)
		{
			label = !self.NoLiteralObject(el.predicate.value) ? el.object.value : el.key.value;
			if(self.CheckRet(el.object.value)) 
				label = "";
		};
		//Creazione Bottoni
		var cancella = $(document.createElement('div')).addClass('col-md-3 center')
			.append($("<input>").attr("id","delete-ann").addClass("btn waves-effect waves-light red valencia white-text").attr("type","button").attr("value","Cancella").attr("onclick","Scrap.AddToFile('"+boxID+"','D','"+idToRemove+"')"));
		var modifica = $(document.createElement('div')).addClass('col-md-offset-3 col-md-2')
			.append($("<input>").attr("id","edit-ann").addClass("btn waves-effect waves-light green accent-4  white-text").attr("type","button").attr("value","Modifica").attr("onclick","Scrap.EditOpen('"+boxID+"','','U','"+idToRemove+"')"))
		//Creazione footer

		var footerdiv = $(document.createElement("div")).addClass("commnet-separator row");
		footerdiv.append($("<div>").addClass('col-md-4 center')
			.append($("<span>").addClass("gn-icon " + icon).text(el.label.value).addClass('white-text footerlabel')));
			
		if(el.gruppo == undefined && getCookie("email") != ""){
			box.attr("data-info", JSON.stringify(el));
			footerdiv.append(modifica).append(cancella);
		}
		else if (el.gruppo != undefined)
			footerdiv.append($(document.createElement('div')).addClass('col-md-offset-3 col-md-2').append($("<span>").text(readRDF.DecodeGroupName(el.gruppo)).addClass('white-text footerlabel')));
		//Creazione BOX	
		box.append($("<div>").addClass("commnet-desc modal-content row")
				.append($("<div>").addClass('col-md-11').append($("<p>").attr("id","a-lable").text(label)))//qua sono tropi id a-lable
				.append($("<div>").addClass('col-md-1 center').append($("<a>").attr("id","hide-ann").addClass("btn-flat waves-effect grey-text text-darken-2 gn-icon gn-icon-hide modal-action modal-close").attr("onclick","Scrap.HideModal('CarouselViewMain')")))
				.append($("<div>").addClass('col-md-12').append($("<span>").addClass("time").text("Annotato il " + el.at.value + annotator))))
		   .append(footerdiv);
		return box;
	};
	self.HideModal = function(id){
		$("#modalBox").empty().fadeOut('fast');
		//$("#modalBox").fadeOut('fast');
		//$("#" + id).remove();
		if ( $("body").attr('style') != undefined )
			{
				$("body").removeAttr('style');
			};
	};
	self.AddToFile = function(id, azione, idToRemove){
		var json = "";
		json = $("#" + id).attr("data-info");
		var el = JSON.parse(json);			
		if(azione == "D"){
			el.azione = {value: "D"};
			self.TryScrap(JSON.stringify(el));
			if(el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes")
				self.RefreshCheckBox(self.CheckID(self.Encode(el.object.value)));
			else
				self.RefreshCheckBox(self.CheckID(self.Encode(el.predicate.value)));
			if($($("#CarouselView").children()[0]).children().length > 1){
				if($("#"+id).hasClass("active")){
					var sibling = $("#"+id).next();
					$("#"+id).remove();
					sibling.addClass("active");
					$("#CarouselView").carousel('next');
				}
				else	
					$("#"+id).remove();
			}
			else
				self.HideModal("CarouselView");
			return;
		}
		var oldObject = JSON.stringify(el);
		oldObject = JSON.parse(oldObject);
		var predicate = "", ob = $("#" + id), retObject = "", changeClass = false, changePos = false;
		if(id == "idDiMerda"){
			try
			{
				predicate = self.Decode(ob.find("#iperSelector").val().substr(0, ob.find("#iperSelector").val().length - 1));
			}
			catch(e)
			{
				predicate = self.Decode("hasTitle");
			}
			if(self.CheckRet(predicate))
			{
				retObject = predicate;
				predicate = "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes";
			}
			if(azione == "U"){
				el.azione = {value:"D"};
				self.TryScrap(JSON.stringify(el));
			}
		}
		if(el.predicate.value != predicate || (el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes" && el.object.value != retObject)) 
			changeClass = true;
		
		if(self.NoLiteralObject(el.predicate.value) && el.predicate.value != predicate && !self.NoLiteralObject(predicate))
			el.object = {value:el.key.value};
		else
			if(!self.NoLiteralObject(el.predicate.value) && el.predicate.value != predicate && self.NoLiteralObject(predicate))
				el.key = {value: el.object.value};
				
		el.azione = {value:"I"};
		if(id == "idDiMerda"){
			if(self.CheckRet(retObject))
			{
				el.key = {value:el.object.value};
				el.object = {value: retObject};
			}
			el.predicate = {value:predicate};
			el.label = {value:ob.find("#iperSelector option:selected").text()};
			el.bLabel = {value:ob.find("#iperTextArea").val()};

			try{
				var pos=$('#testo_selezionato').attr('data-info'); //mi prendo la nuova posizione e il nuovo testo che si trovano in un data-info del testo selezionato  nel box
					var j=JSON.parse(pos);
					if(j.start.value != el.start.value || j.end.value != el.end.value || j.id.value!=el.id.value){
						changePos = true;
						el.id={value:j.id.value}; //rimpiazza con i nuovi valori
						el.start={value:j.start.value};
						el.end={value:j.end.value};
						if(!self.NoLiteralObject(el.predicate.value))
							el.object={value:j.object.value};
						else
							el.key = {value:j.object.value};
					}
			}
			catch(e){}
		}
		if(azione == "I"){
			var index = ob.find("#iperSelector").val().slice(-1);
			var control = "ver1";
			if(index != 0) control = "cited";
			el.subject = {value: control};
		}		
		self.TryScrap(JSON.stringify(el));
		self.HideModal(id);

		if(changeClass){
			//Refresh qui
			var newCheckBox = "", oldCheckBox = "";
			if(oldObject.predicate.value != el.predicate.value){
				//Sono diversi
				//Qui sono sicuro che solo uno potrebbe essere una retorica
				if(el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes"){
					//se quello nuovo è una retorica
					newCheckBox = self.CheckID(self.Encode(el.object.value));
					oldCheckBox = self.CheckID(self.Encode(oldObject.predicate.value));
				}
				else if (oldObject.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes")
				{
					//Se quello vecchio era una retorica
					newCheckBox = self.CheckID(self.Encode(oldObject.object.value));
					oldCheckBox = self.CheckID(self.Encode(el.predicate.value));
				}
				else
				{
					//se nessuno dei due era una retorica
					newCheckBox = self.CheckID(self.Encode(el.predicate.value));
					oldCheckBox = self.CheckID(self.Encode(oldObject.predicate.value));
				}
			}
			else
			{
				//predicato non cambiato, ma tuttavia controllare l'oggetto se il predicato è "Retorica"
				if(el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes")
				{
					if(el.object.value != oldObject.object.value){
						newCheckBox = self.CheckID(self.Encode(el.object.value));
						oldCheckBox = self.CheckID(self.Encode(oldObject.object.value));
					}
				}
			}
			if(el.subject.value == "cited")
				newCheckBox = newCheckBox[0] != 'c' ? "c" + newCheckBox: newCheckBox;
			if(oldObject.subject.value.slice(-8).indexOf("cited") != -1)
				oldCheckBox = oldCheckBox[0] != 'c' ? "c" + oldCheckBox: oldCheckBox;
			self.RefreshCheckBox(newCheckBox);
			self.RefreshCheckBox(oldCheckBox);
		}
		else if(changePos){
			var chk = "";
			if(el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes")
				chk = self.CheckID(self.Encode(el.object.value));
			else
				chk = self.CheckID(self.Encode(el.predicate.value));
			if(el.subject.value == "cited")
				chk = chk[0] != 'c' ? "c" + chk: chk;
			self.RefreshCheckBox(chk);
		}
	}
	self.CheckAnnotation = function(from){
		var ann = sessionStorage.getItem('ann');
		if(ann == undefined || ann == "") return from;
		if(typeof ann == "object") ann = [ann];
		else{
			ann = ann.replace(/\|/g, ",");
			ann = "[" + ann + "]";
			ann = JSON.parse(ann);
		}
		var arr = [];
		for(var i = 0; i < ann.length; i++){
			if(ann[i].id.value != undefined)
				if(ann[i].id.value == from.id.value)
					if(ann[i].start.value == from.start.value)
						if(ann[i].end.value == from.end.value){
								return null;
							}
		}
		return from;
	}
	self.EditOpen = function(id, altro, azione, idToRem){
			var dati = "";
			if(id != undefined && id != null){
				dati = $("#" + id).attr("data-info");
				dati = JSON.parse(dati);
				$("#CarouselViewMain").remove();
			}
			else
				dati = altro;
			var disp = id == undefined || id == null ? 'none' : 'block';
			var disptext = "";

			var blockid = "idDiMerda";
			var bodyLabel = "";
			var bodyObject = "";
			var disptitle = "";

			bodyLabel = dati.bLabel == undefined ? "" : dati.bLabel.value;
			try
			{
				if(!self.CheckRet(dati.object.value))
					bodyObject = !self.NoLiteralObject(dati.predicate.value) ? dati.object.value : dati.key.value;
			}catch(e){}

			if (disp == 'none') {
				disptitle = "Crea annotazione";
			}
			else {
				disptitle = "Modifica annotazione";
			};
			if (disp == 'none') {
				dispnote = "Inserisci la tua nota qui";
			}
			else {
				dispnote = "";
			};


			var box = $(document.createElement('div'))
				.attr("id", blockid)
				.addClass("ann-details ann-shower modal modal-fixed-footer purple wisteria")
				.attr("style", "display:block;")
				.attr("data-info", JSON.stringify(dati))
				.attr("name", "inverse-dropdown");
			box.append('<div class="commnet-desc modal-content">\
							<form>\
								<div class="row">\
									<div class="col-md-12 center">\
										<h2 >'+ disptitle +'</h2>\
									</div>\
									<div class="col-md-6 center">\
										<select id="iperSelector" data-toggle="select" name="searchfield" class="form-control select select-info mrs mbm">\
											<option value="hasTitle0">Titolo</option>\
											<option value="hasAuthor0">Autore</option>\
											<option value="hasDOI0">DOI</option>\
											<option value="hasPublicationYear0">Anno di pubblicazione</option>\
											<option value="hasURL0">URL</option>\
											<option value="hasComment0">Commenti</option>\
											<optgroup label="Retorica">\
												<option value="deo:Introduction0">Introduzione</option>\
												<option value="skos:Concept0">Concetto</option>\
												<option value="sro:Abstract0">Astratto</option>\
												<option value="deo:Materials0">Materiali</option>\
												<option value="deo:Methods0">Metodi</option>\
												<option value="deo:Results0">Risultati</option>\
												<option value="sro:Discussion0">Discussione</option>\
												<option value="sro:Conclusion0">Conclusione</option>\
											</optgroup>\
											<optgroup label="Citazione">\
												<option value="cites0">Frammento Cit.</option>\
												<option value="hasTitle1">Titolo Cit.</option>\
												<option value="hasAuthor1">Autore Cit.</option>\
												<option value="hasDOI1">DOI Cit.</option>\
												<option value="hasPublicationYear1">Anno di pubblicazione Cit.</option>\
												<option value="hasURL1">URL Cit.</option>\
											</optgroup>\
										</select>\
									</div>\
									<div class="col-md-6 center" style="display: '+ disp +';">\
										<a id="change-target" class="waves-effect waves-light orange carrot white-text btn-flat gn-icon gn-icon-ann-target" onclick="modificaPosizione();">Cambia Posizione</a>\
									</div>\
									<div class="col-md-12 center">\
										<p id="testo_selezionato" style="overflow:auto;">' + ellipsify(bodyObject, 447) + '</p>\
									</div>\
									<div class="input-field col-md-12">\
										<textarea id="iperTextArea" class="materialize-textarea" name="text-label" cols="40" style="margin: 5%;width: 90%;" class="materialize-textarea">' + ellipsify(bodyLabel) + '</textarea>\
										<label for="iperTextArea">' + dispnote + '</label>\
									</div>\
								</div>\
							</form>\
						</div>\
						<div class ="commnet-separator">\
							<div class="edit-delete commnet-user row">\
								<div class="col-md-3 col-md-offset-3 center">\
									<input id="save-ann" class="waves-effect waves-teal btn white purple-text text-wisteria" type="button" value="Salva" onclick="Scrap.AddToFile(\''+blockid+'\', \''+azione+'\', \'' + idToRem + '\')">\
									</div>\
								<div class="col-md-3 center">\
									<input class="waves-effect btn-flat white-text" type="button" value="Annulla" onclick="Scrap.HideModal(\'idDiMerda\')">\
									</div>\
								<div class="col-md-3">\
								</div>\
							</div>\
						</div>');
			var father = $('#modalBox');
			father.append(box);
			$(".commnet-desc.modal-content").mCustomScrollbar({
					axis:"y",
					theme:"minimal-dark"
			});
			$(".commnet-desc.modal-content").mCustomScrollbar({
					axis:"y",
					theme:"minimal-dark"
			});
			$("body").attr('style', 'overflow:hidden;');
			if(!($(father).is(":visible"))) father.fadeIn('fast');
			var neWelements = {id:{value:dati.id.value},start:{value:dati.start.value},end:{value:dati.end.value},object:{value:dati.object.value}};
			$("p#testo_selezionato").attr("data-info", JSON.stringify(neWelements));
			AddClassBox();
			SelectBox(dati.predicate.value, dati.subject.value, dati.object.value);
	};
	self.Decode = function(what){
		switch(what){
			case "hasTitle": return "http://purl.org/dc/terms/title";
			case "hasAuthor": return "http://purl.org/dc/terms/creator";
			case "hasDOI": return "http://prismstandard.org/namespaces/basic/2.0/doi";
			case "hasPublicationYear": return "http://purl.org/spar/fabio/hasPublicationYear";
			case "hasURL": return "http://purl.org/spar/fabio/hasURL";
			case "hasComment": return "http://schema.org/comment";
			case "deo:Introduction": return "http://purl.org/spar/deo/Introduction";
			case "skos:Concept": return "http://www.w3.org/2004/02/skos/core#Concept";
			case "sro:Abstract": return "http://salt.semanticauthoring.org/ontologies/sro#Abstract";
			case "deo:Materials": return "http://purl.org/spar/deo/Materials";
			case "deo:Methods": return "http://purl.org/spar/deo/Methods";
			case "deo:Results": return "http://purl.org/spar/deo/Results";
			case "sro:Discussion": return "http://salt.semanticauthoring.org/ontologies/sro#Discussion";
			case "sro:Conclusion": return "http://salt.semanticauthoring.org/ontologies/sro#Conclusion";
			case "cites": return "http://purl.org/spar/cito/cites";
		}
		return "";
	};
	self.Encode = function(what){
		switch(what){
		    case "http://purl.org/dc/terms/title": return "hasTitle";
			case "http://purl.org/dc/terms/creator": return "hasAuthor";
			case "http://prismstandard.org/namespaces/basic/2.0/doi": return "hasDOI";
			case "http://purl.org/spar/fabio/hasPublicationYear": return "hasPublicationYear";
			case "http://purl.org/spar/fabio/hasURL": return "hasURL";
			case "http://schema.org/comment": return "hasComment";
			case "http://purl.org/spar/deo/Introduction": return "deo:Introduction";
			case "http://www.w3.org/2004/02/skos/core#Concept": return "skos:Concept";
			case "http://salt.semanticauthoring.org/ontologies/sro#Abstract": return "sro:Abstract";
			case "http://purl.org/spar/deo/Materials": return "deo:Materials";
			case "http://purl.org/spar/deo/Methods": return "deo:Methods";
			case "http://purl.org/spar/deo/Results": return "deo:Results";
			case "http://salt.semanticauthoring.org/ontologies/sro#Discussion": return "sro:Discussion";
			case "http://salt.semanticauthoring.org/ontologies/sro#Conclusion": return "sro:Conclusion";
			case "http://purl.org/spar/cito/cites": return "cites";
		}
		return "";
	};
	self.CheckRet = function(what){
		switch(what){
			case "http://purl.org/spar/deo/Introduction":
			case "http://www.w3.org/2004/02/skos/core#Concept":
			case "http://salt.semanticauthoring.org/ontologies/sro#Abstract":
			case "http://purl.org/spar/deo/Materials":
			case "http://purl.org/spar/deo/Methods":
			case "http://purl.org/spar/deo/Results":
			case "http://salt.semanticauthoring.org/ontologies/sro#Discussion":
			case "http://salt.semanticauthoring.org/ontologies/sro#Conclusion": return true;
		}
		return false;
	}
	self.DecodeRetorica = function(what){
		switch(what){
			case "http://purl.org/spar/deo/Introduction": return "Introduzione";
			case "http://www.w3.org/2004/02/skos/core#Concept":  return "Concetto";
			case "http://salt.semanticauthoring.org/ontologies/sro#Abstract": return "Astratto";
			case "http://purl.org/spar/deo/Materials": return "Materiale";
			case "http://purl.org/spar/deo/Methods": return "Metodo";
			case "http://purl.org/spar/deo/Results": return "Risultato";
			case "http://salt.semanticauthoring.org/ontologies/sro#Discussion": return "Discusione";
			case "http://salt.semanticauthoring.org/ontologies/sro#Conclusion":  return "Conclusione";
		}
		 return "Retorica";
	}
	self.CheckID = function(id){
		switch(id){
			case "deo:Introduction":
			case "deo:Introduction0": return "hasIntro";
			case "skos:Concept":
			case "skos:Concept0": return "hasConcept";
			case "sro:Abstract":
			case "sro:Abstract0": return "hasAbstr";
			case "deo:Materials":
			case "deo:Materials0": return "hasMateria";
			case "deo:Methods":
			case "deo:Methods0": return "hasMeth";
			case "deo:Results":
			case "deo:Results0": return "hasRes";
			case "sro:Discussion":
			case "sro:Discussion0": return "hasDisc";
			case "sro:Conclusion":
			case "sro:Conclusion0":	return "hasConc";
			case "cites": return "chasBody";
		}
		return id;
	}
	self.GetIndex = function(what){
		switch(what){
			case "hasTitle0": return 0;
			case "hasAuthor0": return 1;
			case "hasDOI0": return 2;
			case "hasPublicationYear0": return 3;
			case "hasURL0": return 4;
			case "hasComment0": return 5;
			case "deo:Introduction0": return 6;
			case "skos:Concept0": return 7;
			case "sro:Abstract0": return 8;
			case "deo:Materials0": return 9;
			case "deo:Methods0": return 10 ;
			case "deo:Results0": return 11;
			case "sro:Discussion0": return 12;
			case "sro:Conclusion0": return 13;
			case "cites1": case "cites0": return 14;
			case "hasTitle1": return 15;
			case "hasAuthor1": return 16;
			case "hasDOI1": return 17;
			case "hasPublicationYear1": return 18;
			case "hasURL1": return 19;
		}
		return "";
	};
	self.GetPrefixID = function(subject, id)	{
		var prefix = "";
		if(id.indexOf('form1') == 0 || id.indexOf('div1') == 0) return id;
		if(subject.indexOf("www.dlib.org") != -1)
			prefix = "dlib";
		else
			if(subject.indexOf("rivista-statistica.unibo.it") != -1)
				prefix = "RS";
			else
				if (subject.indexOf("almatourism.unibo.it") != -1)
					prefix = "AM";
				else
					if (subject.indexOf("antropologiaeteatro.unibo.it") != -1)
						prefix = "AT";
					else
						if (subject.indexOf("dlib.org/dlib/march14") != -1)
							prefix = "dlib";
							else
								if(subject.indexOf("http://eqa.unibo.it/") != -1)
									prefix = "eqa";


		id = Clear(id);
		switch(prefix)
		{
			case "dlib":
				return "form1_table3_tr1_td1_" + Crea(id.substring(id.indexOf("table5")));
			case "AT":
			case "AM":
			case "RS":
			case "eqa":
				return Crea(id.substring(id.indexOf("div1")));
		}
		function Clear(string){
			string = string.replace(/\[/g,'');
			string = string.replace(/]/g,'');
			string = string.replace(/\//g,'_');
			return string;
		}
		function Crea(string){
			var asd = string.split("_");
			for(var i = 0; i< asd.length; i++){
					if(isNaN(asd[i].slice(-1)))
						asd[i] += "1";
			}
			return asd.join("_");
		}
	}
	self.NoLiteralObject = function(what){
		switch(what){
			case "http://purl.org/spar/cito/cites":
			case "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes":
			case "http://purl.org/dc/terms/creator": return true;
		}
		return false;
	}
	self.SalvaTutto = function(what, reload){
		reload = reload || false;
		what = what || "ann";
		pData = {link: $("#URL").val(), annotations: sessionStorage.getItem(what)};
		var api =  new API();
		api.chiamaServizio({requestUrl: "pages/saveAll.php", data: pData, isAsync:true, callback: function(){
			sessionStorage.setItem(what,"");
			readRDF.GetData("http://vitali.web.cs.unibo.it/raschietto/graph/ltw1516", $('#URL').val());
			if(reload){
				alert("Fatto");
				self.Groups.ReadMulti();
			}
		}});
		$('#view').text("");
		document.getElementById("modalBoxView").style.display="none";
	}
	self.TryScrap = function (arg, dove) {
		dove = dove || "ann";
		if (arg.trim() == "") return ;
		var content = sessionStorage.getItem(dove);
		if(content == null || content.trim() == "")
			sessionStorage.setItem(dove,arg);
		else {
			var data = JSON.parse(arg);
			var vars = content.split('|');
			var newvar = "";
			for (var i = 0; i < vars.length; i++) {
				var obj = JSON.parse(vars[i]);
				if (obj.predicate.value == data.predicate.value && obj.id.value == data.id.value && obj.start.value == data.start.value && obj.end.value == data.end.value )
					continue;		//obj.azione.value != "D" tolto dall'if (dovrebbe)
				newvar += "|"+vars[i];
			}
			sessionStorage.setItem(dove, arg + newvar)
		}
	}
	self.getStyle = function(style) {
		switch(style){
			case "hasAuthor0": case "hasAuthor1": return "rgba(141, 211, 199, 0.5)";
			case "hasPublicationYear0": case "hasPublicationYear1": return "rgba(190, 186, 218, 0.5)";
			case "hasTitle0": case "hasTitle1": return "rgba(128, 177, 211, 0.5)";
			case "hasDOI0": case "hasDOI1": return "rgba(253, 180, 98, 0.5)";
			case "hasURL0": case "hasURL1": return "rgba(252, 205, 229, 0.5)";
			case "hasComment0": case "hasComment1": return "rgba(179,222,105, 0.5)";
			case "cites0": return "rgba(215,48,39,0.5)";
			case "hasIntro": return "rgba(255,237,111,0.5)";
			case "hasConcept": return "rgba(251,128,114, 0.5)";
			case "hasAbstr": return "rgba(255,255,179, 0.5)";
			case "hasMateria": return "rgba(217,217,217, 0.5)";
			case "hasMeth": return "rgba(117,147,173, 0.5)";
			case "hasRes": return "rgba(191,129,45, 0.5)";
			case "hasDisc": return "rgba(128,205,193, 0.5)";
			case "hasConc": return "rgba(204,235,197, 0.5)";
		}
		return null;
	}
	self.CancellaTutto = function(){
		var r = confirm("Sei sicuro di voler cancellare tutto ?");
		if (r == true) {
			var articolo = $('#URL').val();
			if(articolo == undefined || articolo == null || articolo == "") 
				alert("Articolo non valido");
			else
			{
				var nomeSessione = "delAll";
				sessionStorage.setItem(nomeSessione,"");
				var json = JSON.parse(sessionStorage.getItem('annotation'));
				json = json.results.bindings;
				var delAll = "";
				for(var i = 0; i < json.length; i++){
					json[i].azione = {value:"D"};
					delAll += JSON.stringify(json[i]) + "|";
					//self.TryScrap(JSON.stringify(json[i]), nomeSessione);
				}
				sessionStorage.setItem(nomeSessione, delAll.substring(0, delAll.length - 1));
				self.SalvaTutto(nomeSessione, true);
			}
		}		
		$("#cancella-ann").parent().hide();
		$("#ri_ann").parent().show();
	}
	self.Groups = (function(){
		var me = {};
		me.Load = function(chk, article){
			if(chk.checked){
				article = article || $('#URL').val();
				var groupURL = "http://vitali.web.cs.unibo.it/raschietto/graph/" + chk.getAttribute("id");
				readRDF.GetData(groupURL, article);
			}
			else
			{
				sessionStorage.setItem("ann"+chk.getAttribute("id"), "")
				me.ReadMulti();
			}
		};
		me.ReadSingle = function(what, index){
			/* Usato quando si seleziona la categoria delle annotazioni da vedere, e se sono gruppi selezionati */
			/*--------------------------------------------------------------------------------------------------*/
			var FullArray = [], SingleArray = [];
			$("#ListaGruppi input[type='checkbox']:checked").each(function(){
				var json = sessionStorage.getItem('ann'+$(this).attr('id'));
				/*se annotazioni non trovate passas al gruppo successivo selezionato*/
				if(json == null || json == "") return; 
				var control = "ver1";
				if(index != 0) control = "cited";
				SingleArray = me.GetAnnotations(JSON.parse(json).results.bindings, what, control, $(this).attr('id'));
				if(SingleArray.length > 0)
					FullArray = FullArray.concat(SingleArray);
			});
			/*Fine Ciclo*/
			if(FullArray.length > 0)
				return FullArray;
			else
				return null;
		};
		me.ReadMulti = function(){
			/*Usato quando vengono caricate le annotazioni, e se esistono checkbox attivi, le evidenzia*/
			$("#filtri input[type='checkbox']:checked").each(function(){
				$(this)[0].checked = false;
				$(this).trigger("change");
				$(this)[0].checked = true;
				$(this).trigger("change");
			});
		};
		me.GetAnnotations = function(from, what, control, group){
			/*from[i].predicate.value == what -> se abbiamo trovato il tipo*/
			/*from[i].subject.value.slice(-8).indexOf("cited") == -1 && control != "cited" -> se non fa parte delle citazioni in caso in cui si è selezionato quello dell'articolo*/
			var array = [];
			for(var i = 0; i< from.length; i++){
				from[i].gruppo = {value: group};
				if(self.CheckRet(what))
				{	//Se Retorica fai questo
					if(from[i].predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes" && from[i].object.value == what)
						array.push(from[i]);
				}
				else
				{
					if(from[i].predicate.value == what && what == "http://purl.org/dc/terms/creator" && from[i].subject.value.slice(-8).indexOf("cited") == -1 && control != "cited")
						array.push(from[i]);
					else
						if(from[i].predicate.value == what && what == "http://schema.org/comment")
							array.push(from[i]);
						else
							if(from[i].predicate.value == what && from[i].subject.value.slice(-8).indexOf(control) != -1)
								array.push(from[i]);
				}
			}
			return array;
		}
		return me;
	}());
	self.GetMyID = function(id)	{
		function Clear(string){
			string = string.replace(/\[/g,'');
			string = string.replace(/]/g,'');
			string = string.replace(/\//g,'_');
			return string;
		}
		function Crea(string){
			var asd = string.split("_");
			for(var i = 0; i< asd.length; i++){
					if(isNaN(asd[i].slice(-1)))
						asd[i] += "1";
			}
			return asd.join("_");
		}
		id = Clear(id);
		id = Crea(id);
		id = id.replace("_html1_body1_","");
		id = id.replace("html1_body1_","");
		
		return id;
	}
	self.RefreshCheckBox = function(id){
		if (id == "" || id == undefined || id == null || !$("#"+id)[0].checked) return;
		$("#"+id)[0].checked = false;
		$("#"+id).trigger("change");
		$("#"+id)[0].checked = true;
		$("#"+id).trigger("change");
	}
	return self;
}());

function Normalize(str){
var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];
    for(var i=0; i<defaultDiacriticsRemovalMap.length; i++)
        str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
    return str;
}

function ToggleSibling(arg){
	var next= $(arg).next();
	next.slideToggle('fast');
}

function SearchID(id){
	if(id == null || id == undefined) return false;
	var a = id.split(" ");
	for(var i = 0; i < a.length; i++){
		switch(a[i]){
			case "hasAuthor0": case "hasAuthor1": case "hasPublicationYear0": case "hasPublicationYear1": case "hasTitle0": case"hasTitle1":
			case "hasDOI0": case "hasDOI1": case "hasURL0": case "hasURL1": case "hasComment0": case "hasComment1": case "cites0":
			case "hasIntro": case "hasConcept": case "hasAbstr": case "hasMateria": case "hasMeth": case "hasRes": case "hasDisc": case "hasConc":
			return true;
		}
	}
	return false;
}

function isSpan(nodo){
	var controllo=0;
	var span=$(nodo.parentNode).attr("class");		//l'idea è che se facciamo una selezione e ci troviamo dentro lo span(già annotato quindi) lo start lo deve prendere dal suo genitore e non dallo span!
	if(span){	//se è una selezione su testo non annotato span è indefinito
	if((span.indexOf("annotation"))>-1){
		var controllo=1;		//variabile di controllo per saper se stiamo annotando qualcosa che è già annotata
		}	
	}
	return controllo;
}


function posizione_nodo(nodo_comune, nodo,i){
		if(nodo==nodo_comune.childNodes[i])
			return i;
		else
			return posizione_nodo(nodo_comune, nodo, i++);
}	//141215

function manualAnn() {
    var selezione = document.getSelection();
	if(selezione == "" || selezione == null || selezione.anchorNode == null || selezione.focusNode == null) {alert("Selezionare qualcosa."); return null;};
	var inizio_selezione=selezione.anchorOffset;
	var fine_selezione=selezione.focusOffset;
	
	
	if(selezione.anchorNode==selezione.focusNode){			//nodo uguale
		if(inizio_selezione > fine_selezione){
			var focus=selezione.anchorNode;		//inverto i nodi
			var anchor=selezione.focusNode;
			var aux=inizio_selezione			//inverto start e end
			inizio_selezione=fine_selezione;
			fine_selezione=aux;
		}
		else{
			var anchor=selezione.anchorNode;
			var focus=selezione.focusNode;
		}
	}	
		
	else if(selezione.anchorNode!=selezione.focusNode && isSpan(selezione.anchorNode)==1 && isSpan(selezione.focusNode)==1 ){		//nodo diverso, tutti e 2 citati differenza nei parentNode
		var nodo_comune=selezione.getRangeAt(0).commonAncestorContainer;	//prendo il nodo comune
		var selanchor=selezione.anchorNode;
		var selfocus=selezione.focusNode;
		var responso=-1;	//variabile di controllo
		while(responso==-1 && selanchor!=undefined){		//selanchor non dovrebbe essere mai undefined
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selanchor==nodo_comune.childNodes[i]){	
					nodo_iniziale=i;	//posizione del nodo
					responso=0;			//se trova il nodo cambia variabile di controlo ed esce dal while
					break;				//se trova il nodo esce dal for
				}
				else responso=-1;	//se non trova il nodo continua il while
			}
			selanchor=selanchor.parentNode;
		}
		responso=-1;
		while(responso==-1 && selfocus!=undefined){
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selfocus==nodo_comune.childNodes[i]){	
					nodo_finale=i;	//posizione del nodo
					responso=0;
					break;
				}
				else responso=-1;
			}
			selfocus=selfocus.parentNode;
		}
		if(nodo_iniziale<nodo_finale){
			var anchor=selezione.anchorNode;
			var focus=selezione.focusNode;
		}
		else if(nodo_iniziale>nodo_finale){
			var focus=selezione.anchorNode;		//inverto i nodi
				var anchor=selezione.focusNode;
				var aux=inizio_selezione			//inverto start e end
				inizio_selezione=fine_selezione;
				fine_selezione=aux;
		}
	}
		
	else if(selezione.anchorNode!=selezione.focusNode && isSpan(selezione.anchorNode)==1 && isSpan(selezione.focusNode)==0){		//nodo diverso, inizio citato e fine no differenza nei parentNode
		var nodo_comune=selezione.getRangeAt(0).commonAncestorContainer;	//prendo il nodo comune
		var selanchor=selezione.anchorNode;
		var selfocus=selezione.focusNode;
		var responso=-1;	//variabile di controllo
		while(responso==-1 && selanchor!=undefined){		//selanchor non dovrebbe essere mai undefined
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selanchor==nodo_comune.childNodes[i]){	
					nodo_iniziale=i;	//posizione del nodo
					responso=0;			//se trova il nodo cambia variabile di controlo ed esce dal while
					break;				//se trova il nodo esce dal for
				}
				else responso=-1;	//se non trova il nodo continua il while
			}
			selanchor=selanchor.parentNode;
		}
		responso=-1;
		while(responso==-1 && selfocus!=undefined){
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selfocus==nodo_comune.childNodes[i]){	
					nodo_finale=i;	//posizione del nodo
					responso=0;
					break;
				}
				else responso=-1;
			}
			selfocus=selfocus.parentNode;
		}
		
		if(nodo_iniziale<nodo_finale){
			var anchor=selezione.anchorNode;
			var focus=selezione.focusNode;
		}
		else if(nodo_iniziale>nodo_finale){
			var focus=selezione.anchorNode;		//inverto i nodi
				var anchor=selezione.focusNode;
				var aux=inizio_selezione			//inverto start e end
				inizio_selezione=fine_selezione;
				fine_selezione=aux;
		}
	}
	
	
	else if(selezione.anchorNode!=selezione.focusNode && isSpan(selezione.anchorNode)==0 && isSpan(selezione.focusNode)==1){	//nodo diverso, inizio non citato e fine si, differenza nei parentNode	
		var nodo_comune=selezione.getRangeAt(0).commonAncestorContainer;	//prendo il nodo comune
		var selanchor=selezione.anchorNode;
		var selfocus=selezione.focusNode;
		var responso=-1;	//variabile di controllo
		while(responso==-1 && selanchor!=undefined){		//selanchor non dovrebbe essere mai undefined
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selanchor==nodo_comune.childNodes[i]){	
					nodo_iniziale=i;	//posizione del nodo
					responso=0;			//se trova il nodo cambia variabile di controlo ed esce dal while
					break;				//se trova il nodo esce dal for
				}
				else responso=-1;	//se non trova il nodo continua il while
			}
			selanchor=selanchor.parentNode;
		}
		responso=-1;
		while(responso==-1 && selfocus!=undefined){
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selfocus==nodo_comune.childNodes[i]){	
					nodo_finale=i;	//posizione del nodo
					responso=0;
					break;
				}
				else responso=-1;
			}
			selfocus=selfocus.parentNode;
		}
		if(nodo_iniziale<nodo_finale){
			var anchor=selezione.anchorNode;
			var focus=selezione.focusNode;
		}
		else if(nodo_iniziale>nodo_finale){
			var focus=selezione.anchorNode;		//inverto i nodi
				var anchor=selezione.focusNode;
				var aux=inizio_selezione			//inverto start e end
				inizio_selezione=fine_selezione;
				fine_selezione=aux;
		}
	}
	
	
	
	else if(selezione.anchorNode!=selezione.focusNode && isSpan(selezione.anchorNode)==0 && isSpan(selezione.focusNode)==0){	//nodo diverso, non citato	
		var nodo_comune=selezione.getRangeAt(0).commonAncestorContainer;	//prendo il nodo comune
		var selanchor=selezione.anchorNode;
		var selfocus=selezione.focusNode;
		var responso=-1;	//variabile di controllo
		while(responso==-1 && selanchor!=undefined){		//selanchor non dovrebbe essere mai undefined
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selanchor==nodo_comune.childNodes[i]){	
					nodo_iniziale=i;	//posizione del nodo
					responso=0;			//se trova il nodo cambia variabile di controlo ed esce dal while
					break;				//se trova il nodo esce dal for
				}
				else responso=-1;	//se non trova il nodo continua il while
			}
			selanchor=selanchor.parentNode;
		}
		responso=-1;
		while(responso==-1 && selfocus!=undefined){
			for(i=0;i<=nodo_comune.childNodes.length;i++){
				
				if(selfocus==nodo_comune.childNodes[i]){	
					nodo_finale=i;	//posizione del nodo
					responso=0;
					break;
				}
				else responso=-1;
			}
			selfocus=selfocus.parentNode;
		}
		if(nodo_iniziale<nodo_finale){
			var anchor=selezione.anchorNode;
			var focus=selezione.focusNode;
		}
		else if(nodo_iniziale>nodo_finale){
			var focus=selezione.anchorNode;		//inverto i nodi
				var anchor=selezione.focusNode;
				var aux=inizio_selezione			//inverto start e end
				inizio_selezione=fine_selezione;
				fine_selezione=aux;
		}
	}
	
	

	
	var controllo=0;		//1 se abbiamo selezionato una citazione, 0 altrimenti 
	if(anchor!=undefined){
		controllo=isSpan(anchor);
	}
	else{
		alert("errore");
		return;
	}
	
	
	var nodeStart = anchor.parentNode; //nodo nel quale � avvenuta la selezione
	var nodeEnd = focus.parentNode;	//nodo nel quale finisce la selezione
	var target = nodeStart.getAttribute('id');
	var nameElement = nodeStart.nodeName;
	var parentNode = nodeStart;
	var NodeToSearch = anchor;
	/*Se ci sono nodi in mezzo calcola*/
	var StartSearch = anchor;
	var boolForEnd = false;
	var StartOffset = 0;
	if(nodeStart != nodeEnd){
		parentNode = selezione.getRangeAt(0).commonAncestorContainer;
		target = parentNode.getAttribute('id');
		NodeToSearch = nodeEnd;
		if(anchor.nodeName == "#text") StartSearch = anchor.parentNode;
		StartOffset+= $(parentNode).text().indexOf($(anchor).text());	//usato parentNode invece di nodeStart, sennò c'era l'offset che sfasava dato che il padre che hanno in comune ha altri caratteri oltre il nodo che abbiamo selezionato
	}
	else{
		if(nodeStart.childNodes.length > 0){
			NodeToSearch = focus.previousSibling;
			boolForEnd = true;
			if(controllo==0){	//se non è dentro un'annotazione
				StartOffset+= $(nodeStart).text().indexOf($(anchor).text());
			}
			else{			//altrimenti
				StartOffset+= $(nodeStart.parentNode).text().indexOf($(anchor).text());	
			}
				
		}
	}
	var start = inizio_selezione + StartOffset;		//inizio del nodo + offset dal nodo selezionato all'inizio di tutto il testo
	var end = start + selezione.getRangeAt(0).toString().length;
	
	var selected=selezione.getRangeAt(0).toString();
	var autore = getCookie("email") != "" ? getCookie("email") : "http://server/unset-base/anonymus";
	while(SearchID(nodeStart.getAttribute('class')))
		nodeStart = nodeStart.parentNode;
	if(target == "" || target == undefined || target == null)
		target = nodeStart.getAttribute('id');
	var array = {
				id :{value: target},
				start :{value: start},
				end :{value: end},
				azione:{value:"I"},
				object: {value:selected},
				email : {value: autore},
				at :{value: timeGet()},
				label: {value : ""},
				subject : {value: ""},
				predicate: {value : ""},
				bLabel: {value: ""},
				key: {value:""},
				name: {value: getCookie("name")}
				};

	//var array = {azione:"i", body: {object:selected}, target:{id:target,
	//start:start, end:end}, annotazione:"" ,
	//provenance :{name: getCookie("name"),
	//email: getCookie("email"), time: timeGet()}};
	//var json = JSON.stringify(array);
	//var frammento=JSON.parse(json);
	return array;
	}

function annota(str, annotazione){  //str � l'array con i valori che ci servono
	str.annotazione=annotazione;	//aggiungiamo all'array l'annotazione che abbiamo fatto
	var pData = str;
	Scrap.TryScrap(JSON.stringify(pData));

}

function AddClassBox(){
	$('select[name="inverse-dropdown"], select[name="inverse-dropdown-optgroup"], select[name="inverse-dropdown-disabled"]').select2({dropdownCssClass: 'select-inverse-dropdown'});
	$('select[name="searchfield"]').select2({dropdownCssClass: 'show-select-search'});
	$('select[name="inverse-dropdown-searchfield"]').select2({dropdownCssClass: 'select-inverse-dropdown show-select-search'});
}
function SelectBox(predicate, subject, object){
	var index = 0;
	if(subject != "" && subject != undefined && subject.indexOf("cited") != -1) index = 1;
	var ob = $("#idDiMerda");
	if(predicate == undefined || predicate == "")
		predicate = "http://purl.org/dc/terms/title";
	if(predicate == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes") predicate = object;
	var what = Scrap.Encode(predicate);
	ob.find("#iperSelector").val(what + index);
	ob.find("span.select2-chosen").text(ob.find("#iperSelector option").eq(Scrap.GetIndex(what+index)).text());
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length).replace("+", " ");
    }
    return "";
}
function timeGet(){
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
return (day + "/" + month + "/" + year);
}

function getOffset(element, elToFind, end){
	var len = "";
	for(var i = 0; i < element.childNodes.length; i++){
		if(element.childNodes[i] != elToFind)	len += $(element.childNodes[i]).text();
		else
		{
			if(end) len += $(element.childNodes[i]).text();
			return len.length;
		}
	}
	return 0;
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ViewAnnotation(){
	var ann = sessionStorage.getItem('ann');
	if(ann == undefined || ann == ""){ alert("Annotare qualcosa, grazie."); return null;}
	else{
		if(typeof ann == "object") ann = [ann];
		else{
			ann = ann.replace(/\|/g, ",");
			ann = "[" + ann + "]";
			ann = JSON.parse(ann);
		}
		onSuccess(ann); 
	}
}

function onSuccess(json){

	document.getElementById("modalBoxView").style.display="block";
	$('#view').append("<div class ='commnet-separator'>\
							<div class='edit-delete commnet-user row'>\
								<div class='col-md-4 center'>\
									<span class='gn-icon gn-icon-ann-ex white-text footerlabel'>Annotazioni non salvate</span>\
								</div>\
								<div class='col-md-offset-3 col-md-2'>\
									<input id='save' class='btn waves-effect waves-light green accent-4 white-text' type='button' value='Salva Tutto' onclick='Scrap.SalvaTutto()'>\
								</div>\
								<div class='col-md-3 center'>\
									<button id='exit' class='btn-flat waves-effect waves-grey white-text purple wisteria'>Esci</button>\
								</div>\
							</div>\
						</div>\
						<div class='allow-scroll commnet-desc'>\
							<div id='riepilogo_ann'>\
							</div>\
						</div>");
	for(i=0;i<json.length; i++){
		if(json[i].azione.value=="I"){
			if(  json[i].predicate.value=="http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes" || json[i].predicate.value=="http://schema.org/comment"){
				$('#riepilogo_ann').append("<div class='row'><div class='col-md-9'><span id='ann_"+i+"' class='red-text text-valencia'>ANNOTAZIONE</span></div><div class='col-md-3'></div><button id='butt_ann_"+i+"' class='btn waves-effect waves-light red valencia white-text' onclick=elimina('butt_ann_"+i+"','D','ann_"+i+"')>Elimina</button><div class='col-md-12'><p><strong>Tipo</strong>: <em>"+json[i].label.value+"</em></p></div><div class='col-md-12'><p><strong>Annotazione</strong>: <em>"+json[i].bLabel.value+"</em></p></div></div><hr>");
			}
			else{
				$('#riepilogo_ann').append("<div class='row'><div class='col-md-9'><span id='ann_"+i+"' class='red-text text-valencia'>ANNOTAZIONE</span></div><div class='col-md-3'></div><button id='butt_ann_"+i+"' class='btn waves-effect waves-light red valencia white-text' onclick=elimina(\'butt_ann_"+i+"\',\'D\',\'ann_"+i+"\')>Elimina</button><div class='col-md-12'><p><strong>Tipo</strong>: <em>"+json[i].label.value+"</em></p></div><div class='col-md-12'><p><strong>Testo selezionato</strong>: <em>"+json[i].object.value+"</em></p></div><div class='col-md-12'><p><strong>Annotazione</strong>: <em>"+json[i].bLabel.value+"</em></p></div></div><hr>");
			}
		}
		else if(json[i].azione.value=="D"){
			if(  json[i].predicate.value=="http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes" || json[i].predicate.value=="http://schema.org/comment"){
				$('#riepilogo_ann').append("<div class='row'>\
												<div class='col-md-9'>\
													<span id='ann_"+i+"' class='red-text text-valencia'>ANNOTAZIONE (eliminata)</span>\
												</div>\
												<div class='col-md-3'></div>\
													<button id='butt_ann_"+i+"' class='btn waves-effect waves-light red valencia white-text' onclick=ripristina(\'butt_ann_"+i+"\',\'I\',\'ann_"+i+"\')>Ripristina</button>\
												<div class='col-md-12'>\
													<p>\
														<strong>Tipo</strong>: \
														<em>"+json[i].label.value+"</em>\
													</p>\
												</div>\
												<div class='col-md-12'>\
													<p>\
														<strong>Annotazione</strong>: \
														<em>"+json[i].bLabel.value+"</em>\
													</p>\
												</div>\
											</div>\
											<hr>");
			}
			else{
				$('#riepilogo_ann').append("<div class='row'><div class='col-md-9'><span id='ann_"+i+"' class='red-text text-valencia'>ANNOTAZIONE (eliminata)</span></div><div class='col-md-3'></div><button id='butt_ann_"+i+"' class='btn waves-effect waves-light red valencia white-text' onclick=ripristina(\'butt_ann_"+i+"\',\'I\',\'ann_"+i+"\')>Ripristina</button><div class='col-md-12'><p><strong>Tipo</strong>: <em>"+json[i].label.value+"</em></p></div><div class='col-md-12'><p><strong>Testo selezionato</strong>: <em>"+json[i].object.value+"</em></p></div><div class='col-md-12'><p><strong>Annotazione</strong>: <em>"+json[i].bLabel.value+"</em></p></div></div><hr>");   //quando faccio un' annotazione che contiene le virgolette si incazzava(ora non pi??
				}
		}
		$("#butt_ann_"+i).attr("data-info", JSON.stringify(json[i]));
	} //chiude for
	$("#riepilogo_ann").mCustomScrollbar({
					axis:"y",
					theme:"minimal-dark"
			});
	$('#exit').click(function(){$('#view').empty(); document.getElementById("modalBoxView").style.display="none";}); //elimino la tabella senn??pend sempre
}
function elimina(id, azione, id_ann){ //non ho passato come parametro direttamente il file json perch� con onclick nel button "cancella" si incazzava, quindi ho passato l'id del bottone che ha come data-info il file json
		var x=confirm("Sicuro di voler eliminare l'annotazione?");
		if (x == true) {
			var json=$('#'+id).attr('data-info');
			var el = JSON.parse(json);
			el.azione = {value:azione};
			el.name = {value:getCookie("name")};
			el.email = {value:getCookie("email")};
			el.at = {value:timeGet()};
			Scrap.TryScrap(JSON.stringify(el));
			$("span#"+id_ann).text("ANNOTAZIONE (eliminata)");
			$("span#"+id_ann).attr("style", "color:red");
			$("#"+id).text("Ripristina");
			$("#"+id).attr("onclick", "ripristina('"+id+"','I','"+id_ann+"')");
			if(el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes")
				Scrap.RefreshCheckBox(Scrap.CheckID(Scrap.Encode(el.object.value)));
			else if(el.subject.value.slice(-8).indexOf("cited") != -1){
				var id=Scrap.CheckID(Scrap.Encode(el.predicate.value));
				id="c"+id;
				Scrap.RefreshCheckBox(id);
			}
			else
				Scrap.RefreshCheckBox(Scrap.CheckID(Scrap.Encode(el.predicate.value)));
				
		}
return 0;
}


function ripristina(id, azione, id_ann){ //non ho passato come parametro direttamente il file json perch� con onclick nel button "cancella" si incazzava, quindi ho passato l'id del bottone che ha come data-info il file json
		var json=$('#'+id).attr('data-info');
		var el = JSON.parse(json);
		el.azione = {value:azione};
		el.name = {value:getCookie("name")};
		el.email = {value:getCookie("email")};
		el.at = {value:timeGet()};
		Scrap.TryScrap(JSON.stringify(el));
		$("span#"+id_ann).text("ANNOTAZIONE (ripristinata)");
		$("span#"+id_ann).attr("style", "color:yellow");
		$("#"+id).text("Elimina");
		$("#"+id).attr("onclick", "elimina('"+id+"','D','"+id_ann+"')"); 
		if(el.predicate.value == "http://www.ontologydesignpatterns.org/cp/owl/semiotics.owl#denotes")
			Scrap.RefreshCheckBox(Scrap.CheckID(Scrap.Encode(el.object.value)));
		else if(el.subject.value.slice(-8).indexOf("cited") != -1){		//caso citazione
				var id=Scrap.CheckID(Scrap.Encode(el.predicate.value));
				id="c"+id;
				Scrap.RefreshCheckBox(id);
		}
		else
			Scrap.RefreshCheckBox(Scrap.CheckID(Scrap.Encode(el.predicate.value)));
return 0;
}

function modificaPosizione(){
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "i.large{opacity: 0.7; pointer-events:none;} #filter-menu{opacity: 0.7; pointer-events:none;} #MenuTrigger{opacity: 0.7; pointer-events:none;} #logout{opacity: 0.7; pointer-events:none;} #annota{opacity: 0.7; pointer-events:none;} #view-ann{opacity: 0.7; pointer-events:none;} .content2{box-shadow: 0 0 20px 20px red ;} .content2:hover{box-shadow: 0 0 20px 4px red ;}";
	document.getElementById("floating-menu").style.display="none";
	document.getElementById("floating-menu-mod-pos").style.display="block";
	document.body.appendChild(css);
	var old=$('.gn-icon-show').attr("onclick");  //salvo vecchio valore onclick
	$('.gn-icon-show').attr("onclick", null); 	//evito il click sull'occhiolino mentre selezioni senn� fa casini
	document.getElementById("modalBox").style.display="none";

		$('#mod_cancel').click(function(){css.innerHTML =""; document.getElementById("modalBox").style.display="block"; document.getElementById("floating-menu-mod-pos").style.display="none"; document.getElementById("floating-menu").style.display="block"; $('.gn-icon-show').attr("onclick", old);});
	
	/*$('#mod_pos').hover(function(){			//TOGLIERE L'EFFETTO ROSSO QUANDO SIAMO SUL PULSANTE MOD POS
    $('.content2').css("box-shadow", "0 0 20px 4px red");}, function(){
    $('.content2').css("box-shadow", "0 0 20px 20px red");});*/
	
	
	$('#mod_pos').click(function(){
					var str=manualAnn();
					if(str != null && str.object.value!=""){
						css.innerHTML ="";
						str=JSON.stringify(str);
						var json=JSON.parse(str);
						var neWelements = {id:{value:json.id.value},start:{value:json.start.value},end:{value:json.end.value},object:{value:json.object.value}};
						$("p#testo_selezionato").attr("data-info", JSON.stringify(neWelements));
						$('#testo_selezionato').text(json.object.value);
						document.getElementById("modalBox").style.display="block";
						document.getElementById("floating-menu-mod-pos").style.display="none";
						document.getElementById("floating-menu").style.display="block";
						$('.gn-icon-show').attr("onclick", old);
					}
		});
}

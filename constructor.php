	<div class='commnet-separator'>
			<div class='edit-delete commnet-user row'>
				<div class='col-md-4 center'>
					<span class='gn-icon gn-icon-ann-ex white-text footerlabel'>Annotazioni non salvate</span>
				</div>
				<div class='col-md-offset-3 col-md-2'>
					<input id='save' class='btn waves-effect waves-light green accent-4 white-text' type='button' value='Salva Tutto' onclick='Scrap.SalvaTutto()'>
				</div>
				<div class='col-md-3 center'>
					<button id='exit' class='btn-flat waves-effect waves-grey white-text purple wisteria'>Esci</button>
				</div>
			</div>
	</div>
	<div class='allow-scroll commnet-desc'>
		<div id='riepilogo_ann'><!-- inizializazione scroller -->
			<div class='row'>
				<div class='col-md-9'>
					<span id='ann_0' class='red-text text-valencia'>ANNOTAZIONE (eliminata)</span>
				</div>
				<div class='col-md-3'></div>
					<button id='butt_ann_0' class='btn waves-effect waves-light red valencia white-text' onclick='ripristina('butt_ann_0','I','ann_0')' data-info='{&quot;ann&quot;:{&quot;type&quot;:&quot;uri&quot;,&quot;value&quot;:&quot;http://server/unset-base/ann-titolo469&quot;},&quot;by&quot;:{&quot;type&quot;:&quot;uri&quot;,&quot;value&quot;:&quot;mailto:a@a.a&quot;},&quot;at&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;23-01-2016 11:22:23&quot;},&quot;label&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;Titolo&quot;},&quot;id&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;div1_div2_div2_div3_div2_h31&quot;},&quot;start&quot;:{&quot;datatype&quot;:&quot;http://www.w3.org/2001/XMLSchema#integer&quot;,&quot;type&quot;:&quot;typed-literal&quot;,&quot;value&quot;:&quot;0&quot;},&quot;end&quot;:{&quot;datatype&quot;:&quot;http://www.w3.org/2001/XMLSchema#integer&quot;,&quot;type&quot;:&quot;typed-literal&quot;,&quot;value&quot;:&quot;54&quot;},&quot;subject&quot;:{&quot;type&quot;:&quot;uri&quot;,&quot;value&quot;:&quot;http://rivista-statistica.unibo.it/article/view/4595_ver1&quot;},&quot;predicate&quot;:{&quot;type&quot;:&quot;uri&quot;,&quot;value&quot;:&quot;http://purl.org/dc/terms/title&quot;},&quot;object&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;Multivariate normal-Laplace distribution and processes&quot;},&quot;bLabel&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;Questo è il titolo del articolo.&quot;},&quot;name&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;Ion Ursachi&quot;},&quot;email&quot;:{&quot;type&quot;:&quot;literal&quot;,&quot;value&quot;:&quot;a@a.a&quot;},&quot;azione&quot;:{&quot;value&quot;:&quot;D&quot;}}'>Ripristina</button>
				<div class='col-md-12'>
					<p>
						<strong>Tipo</strong>: 
						<em>Titolo</em>
					</p>
				</div>
				
				<div class='col-md-12'>
					<p>
						<strong>Testo selezionato</strong>:
						<em>Multivariate normal-Laplace distribution and processes</em>
					</p>
				</div>
				
				<div class='col-md-12'>
					<p>
						<strong>Annotazione</strong>
						<em>Questo è il titolo del articolo.</em>
					</p>
				</div>
					
			</div>
			<hr>
		</div>
	</div>


-------------------------------------------------------------------------------------------



<p id='ann_"+i+"'>
<span id='ann_"+i+"' style='color:red'>ANNOTAZIONE (eliminata)</span>
<br><br><b>Tipo</b>: 
<i>"+json[i].label.value+"</i>
<br><b>Testo selezionato</b>: 
<i>"+json[i].object.value+"</i>
<br><b>Annotazione</b>: 
<i>"+json[i].bLabel.value+"</i>
<span style='float:right'>
<button id='butt_ann_"+i+"' class='azzuro red red1' onclick=ripristina(\'butt_ann_"+i+"\',\'I\',\'ann_"+i+"\')>Ripristina</button>
</span><br><br>
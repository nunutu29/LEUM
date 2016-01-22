<!--ann-menu-filter-->
<div id="filter-menu" class ="allow-scroll gn-menu-wrapper gn-open-all latest_tweets show" style="display:none !important;"><!--  -->
	<div class="gn-scroller mCustomScrollbar _mCS_1 mCS-autoHide" data-mcs-theme="minimal-dark" style="overflow: visible;">
		<div id="tabnav" class="col-sm-12 red valencia">
			<ul class="tabs">
				<li class="tab col-sm-4 waves-effect waves-light red valencia"><a class="white-text"  href="#libreria"><span class="gn-icon gn-icon-lib">&nbsp;</span></a></li>
				<li class="tab col-sm-4 waves-effect waves-light red valencia"><a class="white-text" href="#filtri"><span class="gn-icon gn-icon-ann-filter">&nbsp;</span></a></li>
				<li class="tab col-sm-4 waves-effect waves-light red valencia"><a class="white-text" href="#gruppi"><span class="gn-icon gn-icon-groups">&nbsp;</span></a></li>
			</ul>
		</div>

		<div id="libreria" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside col-sm-12" tabindex="0">
			<div  class="mCSB_container" style="position: relative; top: 0px; left: 0px;" dir="ltr">
				<div width ="100%">
					<ul class="gn-menu doc-annotati">
					</ul>
				</div>
			</div>
		</div>

		<div id="filtri" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside col-sm-12" tabindex="0">
			<div  class="mCSB_container" style="position: relative; top: 0px; left: 0px;" dir="ltr">
				<div class ="check-boxs">
					<div width ="100%">
						<div class ="checkbox-grid-left">
							<ul class ="gn-menu ann">
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasTitle" class="" type="checkbox">
									<label for ="hasTitle" name="" class=""></label>
									<a class ="">Titolo</a>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasAuthor" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasAuthor" name="" class="css-label1"></label>
									<a class ="">Autore</a>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasDOI" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasDOI" name="" class="css-label1"></label>
									<a class ="">DOI</a>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasPublicationYear" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasPublicationYear" name="" class="css-label1"></label>
									<a class ="">Anno di pubblicazione</a>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasURL" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasURL" name="" class="css-label1"></label>
									<a class ="">URL</a>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasComment" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasComment" name="" class="css-label1"></label>
									<a class ="">Commenti</a>
								</li>
								<li class ="gn-menu-slide-menu-w" id="gn-menu-slide-menu-retoric">
									<a class ="gn-icon gn-icon-opendown" id="gn-icon-open-main-retoric" onclick="ToogleSlideRetorica()">Retorica</a>
									<div id ="retoric-checkbox" style="display:none;">
										<!--style="display: none;"-->
										<ul class ="gn-menu retorica">
											<li>
												<input id ="hasIntro" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasIntro" name="" class="css-label1"></label>
												<a class ="">Introduzione</a>
											</li>
											<li>
												<input id ="hasConcept" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasConcept" name="" class="css-label1"></label>
												<a class ="">Concetto</a>
											</li>
											<li>
												<input id ="hasAbstr" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasAbstr" name="" class="css-label1"></label>
												<a class ="">Astratto</a>
											</li>
											<li>
												<input id ="hasMateria" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasMateria" name="" class="css-label1"></label>
												<a class ="">Materiali</a>
											</li>
											<li>
												<input id ="hasMeth" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasMeth" name="" class="css-label1"></label>
												<a class ="">Metodi</a>
											</li>
											<li>
												<input id ="hasRes" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasRes" name="" class="css-label1"></label>
												<a class ="">Risultati</a>
											</li>
											<li>
												<input id ="hasDisc" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasDisc" name="" class="css-label1"></label>
												<a class ="">Discussione</a>
											</li>
											<li>
												<input id ="hasConc" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasConc" name="" class="css-label1"></label>
												<a class ="">Conclusione</a>
											</li>
										</ul>
									</div>
								</li>
								<li class ="gn-menu-slide-menu-w" id="gn-menu-slide-menu-cites">
									<a class ="gn-icon gn-icon-opendown" id="gn-icon-open-main-cites" onclick="ToogleSlideCitazione()">Citazioni</a>
									<div id ="cites-checkbox" style="display:none;">
										<ul class ="gn-menu">
											<li>
												<input id ="chasBody" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasBody" name="" class="css-label1"></label>
												<a class ="">Frammento</a>
											</li>
											<li>
												<input id ="chasTitle" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasTitle" name="" class="css-label1"></label>
												<a class ="">Titolo</a>
											</li>
											<li>
												<input id ="chasAuthor" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasAuthor" name="" class="css-label1"></label>
												<a class ="">Autore</a>
											</li>
											<li>
												<input id ="chasDOI" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasDOI" name="" class="css-label1"></label>
												<a class ="">DOI</a>
											</li>
											<li>
												<input id ="chasPublicationYear" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasPublicationYear" name="" class="css-label1"></label>
												<a class ="">Anno di pubblicazione</a>
											</li>
											<li>
												<input id ="chasURL" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasURL" name="" class="css-label1"></label>
												<a class ="">URL</a>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="gruppi" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside col-sm-12" tabindex="0">
			<div  class="mCSB_container" style="position: relative; top: 0px; left: 0px;" dir="ltr">
				<div class ="check-boxs">
					<div class ="checkbox-grid-left">
						<ul id="ListaGruppi" class="gn-menu">

						</ul>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
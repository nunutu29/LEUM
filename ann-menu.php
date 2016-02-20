<!--ann-menu-filter-->
<div id="filter-menu" class ="allow-scroll gn-menu-wrapper gn-open-all latest_tweets" style="display:none !important;"><!--  -->
	<div class="gn-scroller mCustomScrollbar _mCS_1 mCS-autoHide" data-mcs-theme="minimal-dark" style="overflow: visible;">
	
		<div id="tabnav" class="col-sm-12 red valencia">
			<ul class="tabs">
				<li class="tab col-sm-4 waves-effect waves-light red valencia"><a class="white-text"  href="#libreria"><span class="gn-icon gn-icon-lib">&nbsp;</span></a></li>
				<li class="tab col-sm-4 waves-effect waves-light red valencia"><a class="white-text active" href="#filtri"><span class="gn-icon gn-icon-ann-filter">&nbsp;</span></a></li>
				<li class="tab col-sm-4 waves-effect waves-light red valencia"><a class="white-text" href="#gruppi"><span class="gn-icon gn-icon-groups">&nbsp;</span></a></li>
			</ul>
		</div>

		<div id="libreria" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside col-sm-12">
			<div  class="mCSB_container" style="position: relative; top: 0px; left: 0px;" dir="ltr">
				<div width ="100%">
				<!-- blocko search mobile -->
					<ul class="gn-menu doc-search" style="display:none;">
						<li>
							<div class="row">
								<div class="col-xs-9 input-field">
									<input name="search" placeholder="Cerca" type="search" required>
      								<label name="searchlabel"></label>
								</div>
								<div class="col-xs-3">
									<a class="gn-icon gn-icon-search grey-text text-darken-2 latest_tweets" title="Cerca" onclick="Page.Search()"></a>
								</div>
							</div>
						</li>
					</ul>
					<ul class="gn-menu doc-annotati">
					</ul>
				</div>
			</div>
		</div>

		<div id="filtri" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside col-sm-12">
			<div  class="mCSB_container" style="position: relative; top: 0px; left: 0px;" dir="ltr">
				<div class ="check-boxs">
					<div width ="100%">
						<div class ="checkbox-grid-left">
							<ul class ="gn-menu ann"  style="margin-top: 0px;">
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasTitle" class="" type="checkbox">
									<label for ="hasTitle" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Titolo</label>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasAuthor" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasAuthor" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Autore</label>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasDOI" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasDOI" name="" class="css-label1">&nbsp;&nbsp;&nbsp;DOI</label>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasPublicationYear" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasPublicationYear" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Anno di pubblicazione</label>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasURL" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasURL" name="" class="css-label1">&nbsp;&nbsp;&nbsp;URL</label>
								</li>
								<li class ="gn-menu-slide-menu-w">
									<input id ="hasComment" class="grey-text text-darken-2" type="checkbox">
									<label for ="hasComment" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Commenti</label>
								</li>
								<li class ="gn-menu-slide-menu-w" id="gn-menu-slide-menu-retoric">
									<input id="gn-icon-open-main-retoric" type="button" onclick="ToogleSlideRetorica()"/>
									<label id="label-gn-icon-open-main-retoric" for="gn-icon-open-main-retoric" class="css-label1 gn-icon gn-icon-opendown">&nbsp;&nbsp;&nbsp;Retorica</label>
									<div id ="retoric-checkbox" style="display:none;">
										<ul class ="gn-menu retorica">
											<li>
												<input id ="hasIntro" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasIntro" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Introduzione</label>
											</li>
											<li>
												<input id ="hasConcept" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasConcept" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Concetto</label>
											</li>
											<li>
												<input id ="hasAbstr" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasAbstr" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Abstract</label>
											</li>
											<li>
												<input id ="hasMateria" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasMateria" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Materiali</label>
											</li>
											<li>
												<input id ="hasMeth" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasMeth" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Metodi</label>
											</li>
											<li>
												<input id ="hasRes" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasRes" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Risultati</label>
											</li>
											<li>
												<input id ="hasDisc" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasDisc" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Discussione</label>
											</li>
											<li>
												<input id ="hasConc" class="grey-text text-darken-2" type="checkbox">
												<label for ="hasConc" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Conclusione</label>
											</li>
										</ul>
									</div>
								</li>
								<li class ="gn-menu-slide-menu-w" id="gn-menu-slide-menu-cites">
									<input type="button" id="gn-icon-open-main-cites" onclick="ToogleSlideCitazione()"/>
									<label id="label-gn-icon-open-main-cites" for="gn-icon-open-main-cites" class="css-label1 gn-icon gn-icon-opendown">&nbsp;&nbsp;&nbsp;Citazioni</label>
									<div id ="cites-checkbox" style="display:none;">
										<ul class ="gn-menu">
											<li>
												<input id ="chasBody" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasBody" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Frammento</label>
											</li>
											<li>
												<input id ="chasTitle" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasTitle" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Titolo</label>
											</li>
											<li>
												<input id ="chasAuthor" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasAuthor" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Autore</label>
											</li>
											<li>
												<input id ="chasDOI" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasDOI" name="" class="css-label1">&nbsp;&nbsp;&nbsp;DOI</label>
											</li>
											<li>
												<input id ="chasPublicationYear" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasPublicationYear" name="" class="css-label1">&nbsp;&nbsp;&nbsp;Anno di pubblicazione</label>
											</li>
											<li>
												<input id ="chasURL" class="grey-text text-darken-2" type="checkbox">
												<label for ="chasURL" name="" class="css-label1">&nbsp;&nbsp;&nbsp;URL</label>
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
		
		<div id="gruppi" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside col-sm-12">
			<div  class="mCSB_container" style="position: relative; top: 0px; left: 0px;" dir="ltr">
				<div class ="check-boxs">
					<div class ="checkbox-grid-left">
						<ul id="ListaGruppi" class="gn-menu" style="margin-top: 0px;">

						</ul>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
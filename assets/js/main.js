/*
	Helios by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var settings = {

		// Carousels
			carousels: {
				speed: 4,
				fadeIn: true,
				fadeDelay: 250
			},

	};

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 960px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				speed: 350,
				noOpenerFade: true,
				alignment: 'center'
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Carousels.
			$('.carousel').each(function() {

				var	$t = $(this),
					$forward = $('<span class="forward"></span>'),
					$backward = $('<span class="backward"></span>'),
					$reel = $t.children('.reel'),
					$items = $reel.children('article');

				var	pos = 0,
					leftLimit,
					rightLimit,
					itemWidth,
					reelWidth,
					timerId;

				// Items.
					if (settings.carousels.fadeIn) {

						$items.addClass('loading');

						$t.onVisible(function() {
							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								if (skel.vars.IEVersion < 10) {

									xf.fadeTo(750, 1.0);
									window.setTimeout(function() {
										xf.removeClass('loading');
									}, 50);

								}
								else
									xf.removeClass('loading');

							}, settings.carousels.fadeDelay);
						}, 50);
					}

				// Main.
					$t._update = function() {
						pos = 0;
						rightLimit = (-1 * reelWidth) + $window.width();
						leftLimit = 0;
						$t._updatePos();
					};

					if (skel.vars.IEVersion < 9)
						$t._updatePos = function() { $reel.css('left', pos); };
					else
						$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

				// Forward.
					$forward
						.appendTo($t)
						.hide()
						.mouseenter(function(e) {
							timerId = window.setInterval(function() {
								pos -= settings.carousels.speed;

								if (pos <= rightLimit)
								{
									window.clearInterval(timerId);
									pos = rightLimit;
								}

								$t._updatePos();
							}, 10);
						})
						.mouseleave(function(e) {
							window.clearInterval(timerId);
						});

				// Backward.
					$backward
						.appendTo($t)
						.hide()
						.mouseenter(function(e) {
							timerId = window.setInterval(function() {
								pos += settings.carousels.speed;

								if (pos >= leftLimit) {

									window.clearInterval(timerId);
									pos = leftLimit;

								}

								$t._updatePos();
							}, 10);
						})
						.mouseleave(function(e) {
							window.clearInterval(timerId);
						});

				// Init.
					$window.load(function() {

						reelWidth = $reel[0].scrollWidth;

						skel.on('change', function() {

							if (skel.vars.touch) {

								$reel
									.css('overflow-y', 'hidden')
									.css('overflow-x', 'scroll')
									.scrollLeft(0);
								$forward.hide();
								$backward.hide();

							}
							else {

								$reel
									.css('overflow', 'visible')
									.scrollLeft(0);
								$forward.show();
								$backward.show();

							}

							$t._update();

						});

						$window.resize(function() {
							reelWidth = $reel[0].scrollWidth;
							$t._update();
						}).trigger('resize');

					});

			});

		  $(".animsition").animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',
			inDuration: 1000,
			outDuration: 600,
			linkElement: '.animsition-link',
			// e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
			loading: true,
			loadingParentElement: 'body', //animsition wrapper element
			loadingClass: 'animsition-loading',
			unSupportCss: [
			  'animation-duration',
			  '-webkit-animation-duration',
			  '-o-animation-duration'
			],
			//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
			//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
			overlay : false,
			overlayClass : 'animsition-overlay-slide',
			overlayParentElement : 'body'
		  });
		
		});
		
		$("img.lazy").lazyload({
			effect : "fadeIn"
		});
	
})(jQuery);

function book() {
	swal({   title: 'Wählen Sie Ihre Wohnung!', html: '<p>Bitte wählen Sie nun die Wohnung welche Sie gerne mieten möchten!</p><ul style="margin: 10px;"><li><input checked name="w" value="1" type="radio" data-labelauty="Nicht Wohnung 1|Wohnung 1 mieten!"/></li><li><input name="w" value="2" type="radio" data-labelauty="Nicht Wohnung 2|Wohnung 2 mieten!"/></li><li><input name="w" value="3" type="radio" data-labelauty="Nicht Wohnung 3|Wohnung 3 mieten!"/></li><li><input name="w" value="4" disabled type="radio" data-labelauty="Nicht Wohnung 4|Wohnung 4 mieten!"/></li><li><input name="w" value="5" type="radio" data-labelauty="Nicht Wohnung 5|Wohnung 5 mieten!"/></li></ul><p>Da die Wohnungen bei der Vermietung von einer Agentur betreut wird, werden Sie zur Buchung auf eine externe Seite weitergeleitet.</p>', type: 'info',   showCancelButton: true,   confirmButtonColor: '#3085d6',   cancelButtonColor: '#d33',   confirmButtonText: 'Seite wechseln!', cancelButtonText: 'Abbrechen', closeOnConfirm: false }, function() {   
		swal(     'Auf Wiedersehen!',     'Sie werden in Kürze weitergeleitet',     'success'   ); 
		setTimeout(function() {     window.location.href = link;    }, 1000);
	});
	$(":radio").labelauty({ minimum_width: "100%" });
	var link = 1;
	$(".labelauty").click( function(){
	  if( $(this).is(':checked') ){
		switch ($(this).val()) {
			case "1":
				link = "http://www.us-nordsee.de/mietobjekte/viewproperty/villa-flinthoern-wohnung-1/195/de.html";
				break;
			case "2":
				link = "http://www.us-nordsee.de/mietobjekte/viewproperty/villa-flinthoern-wohnung-2/198/de.html";
				break;
			case "3":
				link = "http://www.us-nordsee.de/mietobjekte/viewproperty/villa-flinthoern-wohnung-3/194/de.html";
				break;
			case "4":
				link = "#4";
				break;
			case "5":
				link = "#5";
				break;
			default:
				link = "#";
				break;
		}
	  }
	});
}
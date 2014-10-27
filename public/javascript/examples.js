(function($) {
	var AccordionSliderExamples = {
		currentExample: 1,

		loadExample: function(index) {
			this.renderExample1();

		},
		
		renderExample1: function() {
			$('#example1').accordionSlider({
				width: 960,
				height: 400,
				responsiveMode: 'auto',
				openedPanelSize: 'max',
				maxOpenedPanelSize: '80%',
				visiblePanels: 5,
				closePanelsOnMouseOut: false,
				autoplay: true
			});

			// change the responsive mode
			$('.controls a').click(function(event) {
				event.preventDefault();

				if ($(this).hasClass('auto')) {
					// change the responsive mode to 'auto' and remove the 'custom-responsive' class
					$('#example1').removeClass('custom-responsive');
					$('#example1').accordionSlider('responsiveMode', 'auto');

					// change the arrows' visibility
					$('.auto-arrow').show();
					$('.custom-arrow').hide();
				} else if ($(this).hasClass('custom')) {
					// change the responsive mode to 'custom' and add the 'custom-responsive' 
					// class in order to use it as a reference in the CSS code
					$('#example1').addClass('custom-responsive');
					$('#example1').accordionSlider('responsiveMode', 'custom');

					// change the arrows' visibility
					$('.custom-arrow').show();
					$('.auto-arrow').hide();
				}
			});
		},

		renderExample2: function() {
			$('#example2').accordionSlider({
				width: 960,
				height: 400,
				responsiveMode: 'custom',
				autoplay: false,
				mouseWheel:false,
				breakpoints: {
					700: {visiblePanels: 6},
					500: {visiblePanels: 4}
				}
			});

			// instantiate fancybox when a link is clicked
			$('#example2 .as-panel > a').on('click', function(event) {
				event.preventDefault();

				// check if the clicked link is also used in swiping the accordion
				// by checking if the link has the 'as-swiping' class attached.
				// if the accordion is not being swiped, open the lightbox programmatically,
				// at the correct index
				if ($(this).hasClass('as-swiping') === false)
					$.fancybox.open($('#example2 .as-panel > a'), {index:$(this).parent().index()});
			});
		},

		renderExample3: function() {
			$('#example3').accordionSlider({
				width: 960,
				height: 400,
				responsiveMode: 'custom',
				visiblePanels: 7,
				startPanel: 3,
				closePanelsOnMouseOut: false,
				shadow: false,
				panelDistance: 10,
				autoplay: false,
				mouseWheel: false,
				breakpoints: {
					960: {visiblePanels: 5},
					800: {visiblePanels: 3, orientation: 'vertical', width: 600, height: 500},
					650: {visiblePanels: 4},
					500: {visiblePanels: 3, orientation: 'vertical', aspectRatio: 1.2}
				}
			});
		},

		renderExample4: function() {
			// load the sublime API
			if (typeof sublime === 'object')
                sublime.load();

            // instantiate sublime videos
            sublime.ready(function() {
				$('#example4').find('.sublime').each(function() {
					sublime.prepare($(this).attr('id'));
				});
            });

            // instantiate video.js videos
			$('#example4').find('.video-js').each(function() {
				var newID = $(this).attr('id') + '_' + new Date().valueOf();
				$(this).attr('id', newID);
				$(this).parent().attr('data-videojs-id', newID);

				videojs(newID, $(this).data('setup'));
			});

			$('#example4').accordionSlider({
				width: 960,
				height: 350,
				closePanelsOnMouseOut: false,
				shadow: false,
				panelDistance: 10,
				autoplay: false,
				mouseWheel: false
			});
		},

		unloadCurrentExample: function() {
			var accordion = $('section.example').find('.accordion-slider');

			accordion.accordionSlider('destroy');
			$('section.example').empty();
		}
	};

	jQuery(document).ready(function() {
		AccordionSliderExamples.loadExample(1);

		$('.example-switcher div').click(function() {
			AccordionSliderExamples.loadExample($(this).index() + 1);
		});
	});
})(jQuery);

$(document).ready(function(){/* affix the navbar after scroll below header */

// Silder test
 $("#slider").editRangeSlider({
  bounds: {min: 0, max: 15000},
  defaultValues:{min: 100, max: 400},
  // range: {min: 400, max: 400}, 
  type: "number",
  arrows:false,
  step:50,  

  // type: "number",
});

$('#item-id').draggable( "destroy" );

$('#nav').affix({
      offset: {
        top: $('header').height()-$('#nav').height()
      }
});	

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '#nav' })

/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

/* smooth scrolling for nav sections */
$('#nav .navbar-nav li>a').click(function(){
  var link = $(this).attr('href');
  var posi = $(link).offset().top+20;
  $('body,html').animate({scrollTop:posi},700);
})

/* accordion layers */
$('#example1').accordionSlider({
	width: 1150,
	// orientation: "horizontal",
	height: 510,
	startPanel: 0,
	shadow: 0,
	responsiveMode: 'auto',
	openedPanelSize: '60%',
	maxOpenedPanelSize: '100%',
	visiblePanels: 3,
	closePanelsOnMouseOut: false,
	autoplay: false,
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

// $("#accordion1").awsAccordion({
//   type:"horizontal",
//   cssAttrsHor:{
//       ulWidth:"responsive",
//       liHeight:400,
//     	liWidth:50
//   },
//   startSlide:2,
//   openCloseHelper:{
//       openIcon:"plus",
//       closeIcon:"minus"
//   },
//   openOnebyOne:true,
//   classTab:"small",
//   slideOn:"mouseover",
//   autoPlay:false,
//   autoPlaySpeed:500,
//   startSlide : 3
// })

/* google maps */

// enable the visual refresh
//google.maps.visualRefresh = true;

// var map;
// function initialize() {
//   var mapOptions = {
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
//   	// try HTML5 geolocation
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = new google.maps.LatLng(position.coords.latitude,
//                                        position.coords.longitude);

//       var infowindow = new google.maps.InfoWindow({
//         map: map,
//         position: pos,
//         content: 'Location found using HTML5.'
//       });

//       map.setCenter(pos);
//     }, function() {
//       handleNoGeolocation(true);
//     });
//   } else {
//     // browser doesn't support geolocation
//     handleNoGeolocation(false);
//   }
// }

// function handleNoGeolocation(errorFlag) {
//   if (errorFlag) {
//     var content = 'Error: The Geolocation service failed.';
//   } else {
//     var content = 'Error: Your browser doesn\'t support geolocation.';
//   }

//   var options = {
//     map: map,
//     position: new google.maps.LatLng(60, 105),
//     content: content
//   };

//   var infowindow = new google.maps.InfoWindow(options);
//   map.setCenter(options.position);
// }
// google.maps.event.addDomListener(window, 'load', initialize);


});
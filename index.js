$(document).ready(() => {
    const $navbarToggle = $('#navbar-toggle');

    function toggleNavbarVisibility(e) {
        $navbarToggle.attr('aria-expanded', !($navbarToggle.attr("aria-expanded") === 'true'));
    };

    // toggle mobile nav bar links
    $('#navbar-toggle, .navbar-link').click(toggleNavbarVisibility);
    
    // hide the nav bar when a user clicks a link
    $('#navbar-menu').click(toggleNavbarVisibility);

    // prevent link click events from bubbling
    $('.navbar-link-list').click(e => e.stopPropagation());

    // when the window is scrolled past the hero section
    //  set the background color of the nav to not be transparent
    function toggleNavBackground() {
      var scrollPosition = window.scrollY;
      var heroHeight = $('section.hero').height();
      // .scrolled class sets BG color
      $('#navbar').toggleClass('scrolled', scrollPosition >= heroHeight);
    }

    $(window).on('scroll resize', toggleNavBackground);
    toggleNavBackground();

    $(window).click(e => {
        if (!$(e.target).closest('#navbar').length) {
            $navbarToggle.attr('aria-expanded', false);
        }
    })
});
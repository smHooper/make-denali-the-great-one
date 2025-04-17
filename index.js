function toggleNavbarVisibility(e) {
    const $navbarToggle = $('#navbar-toggle');
    $navbarToggle.attr("aria-expanded", !($navbarToggle.attr("aria-expanded") === 'true'));
};

$(document).ready(() => {
    // toggle mobile nav bar links
    $('#navbar-toggle').click(toggleNavbarVisibility);
    
    // hide the nav bar when a user clicks a link
    $('#navbar-menu').click(toggleNavbarVisibility);

    // prevent link click events from bubbling
    $('.navbar-link-list').click(e => e.stopPropagation());
});
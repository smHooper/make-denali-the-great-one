PRODUCTS_DIR = 'assets/products';
THUMBNAIL_DIR = PRODUCTS_DIR + '/thumbnails';
IMG_INDICES = [1, 2 , 3];
COLOR_BUTTON_LIST_SELCTOR = '.mockup-color-button-list';
MOBILE_CAROUSEL_INDICATOR_SELECTOR = '.mobile-mockup-carousel-indicator';

function scrollToCarouselImg(index) {
     // Scroll to the selected image
    const carousels = document.querySelectorAll('.carousel');
    const carouselWidth = carousels[0].clientWidth;
    for (const el of carousels) {
        el.scrollLeft = carouselWidth * index;
    }
}


function getHatImgPaths(index) {
    const productType = $('#product-type').text().toLowerCase();
    const img_paths = IMG_INDICES.map(i => `${PRODUCTS_DIR}/${productType}_${index}_${i}.webp`);
    const thumb_paths = img_paths.map(p => p.replace(PRODUCTS_DIR, THUMBNAIL_DIR));
    return {
        imgs: img_paths,
        thumbnails: thumb_paths
    }
}

function getCarouselScrollIndex(carousel) {
    // Calculate the proportional amount of scroll to get the
    //  index of the indicator to be selected
    const width = carousel.clientWidth;
    const scrollPosition = carousel.scrollLeft;
    
    return Math.round(scrollPosition / width);
}


function toggleCarouselNextImgButtons(currentIndex) {
    $('.next-img-left').toggleClass('hidden', currentIndex === 0);
    $('.next-img-right').toggleClass('hidden', currentIndex === ($('.mockup-button').length - 1));
}


$(document).ready(() => {

    // onclick handler for image buttons to change view of colorway
    $('.mockup-button').click(e => {
        const $button = $(e.target).closest('.mockup-button');
        const index = $button.parent().index();
        
        scrollToCarouselImg(index);

        // Remove selected class from current selection and select target
        $('.mockup-button.selected').removeClass('selected');
        $button.addClass('selected');

        // Update mobile carousel indicator
        $(MOBILE_CAROUSEL_INDICATOR_SELECTOR).removeClass('selected')
            .eq(index)
                .addClass('selected');
        
        // toggle visibility of left/right img buttons
        toggleCarouselNextImgButtons(index);
    })

    // onclick handler for button to change colorway
    $('.mockup-color-button').click(e => {
        const $button = $(e.target).closest('.mockup-color-button');
        const $li = $button.parent();
        const index = $li.data('img-id');
        
        // Set img src attribute
        const {imgs, thumbnails} = getHatImgPaths(index);

        const $mockupButtons = $('.mockup-button');
        const $carousel = $('.carousel');
        for (const i in imgs) {
            $mockupButtons.eq(i)
                .find('img')
                    .attr('src', thumbnails[i]);
            
            $carousel.find('img:nth-child(' + (parseInt(i) + 1) + ')')
                .attr('src', imgs[i]);
        }

        $(COLOR_BUTTON_LIST_SELCTOR + ' > li').removeClass('selected');
        $li.addClass('selected');

    });

    // Update the mobile carousel indicator when any carousel is scrolled
    $('.carousel').on('scroll', e => {
        const carousel = e.target;
        
        // round because we just want the nearest indicator
        const imgIndex = getCarouselScrollIndex(carousel);
        $(MOBILE_CAROUSEL_INDICATOR_SELECTOR).removeClass('selected')
            .eq(imgIndex)
                .addClass('selected');
    });

    $('.next-carousel-img-button').click(e => {
        const $button = $(e.target).closest('button');
        const carousel = $('.carousel')[0];
        const currentIndex = getCarouselScrollIndex(carousel);
        const movement = $button.is('.next-img-left') ? -1 : 1;
        const newIndex = currentIndex + movement;
        // scroll
        scrollToCarouselImg(newIndex);
        
        // toggle visibility of left/right img buttons
        toggleCarouselNextImgButtons(newIndex);

        $('.mockup-button.selected').removeClass('selected');
        $('.mockup-button').eq(newIndex).addClass('selected');
    });

    // Add JS fallback for safari because it doesn't implement :focus properly
    $('.with-tooltip').click(e => {
        $(e.target)
            .closest('.with-tooltip')
                .toggleClass('has-focus');
    })
    // when anything else is tapped/clicked, remove the faux-focus class
    $('*:not(.with-tooltip):not(.tooltip)').click(e => {
        $('.with-tooltip').removeClass('has-focus');
    })
})

/*jQuery extensions*/
(function( $ ) {
    // helper method to hide/unhide an element (using the custom utility class, .hidden) AND set the ARIA-hidden attribute appropriately
   $.fn.ariaHide = function(isHiding=true) {
       return this.toggleClass('hidden', isHiding)
           .attr('aria-hidden', isHiding);
   }
})
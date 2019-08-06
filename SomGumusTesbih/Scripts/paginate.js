// total number of pages in the pagination
var totalNumberOfPages = 1;

// Run once when page is loaded and calculate total number of page
$(window).on("load", function () {

    // Counting number of elements with specific ID pattern
    // In this code, specific ID is page
    // This code calculate how many page'i' are there in page
    var result = $('[id^=page]').filter(function () {
        return this.id.match(/page\d+$/); //regex for the pattern "Q followed by a number"
    }).length;

    totalNumberOfPages = result;

    // Run once when page is loaded and activate pagination
    // If this code deleted, pagination will not work
    // Because codes will not run until call
    // This code call showPages manually to activate pagination
    // 1 indicates that, when page is loaded, show first page
    showPages(1);
});

// default page number is 1
var currentPageNumber = 1;

// open desired page
function showPages(desiredPageNumber) {

    // equalize desiredPageNumber to currentPageNumber
    // function will show page according to currentPage
    currentPageNumber = desiredPageNumber;

    // close all pages with set display property to 'none'
    for (var i = 1; i <= totalNumberOfPages; i++) {
        document.getElementById('page' + i).style.display = 'none';
    }

    // open or show desired page
    document.getElementById('page' + currentPageNumber).style.display = 'block';
}

// show next page
function showNext() {
    // increase current page number
    currentPageNumber++;

    // if page number overflows, prevent overflowing, set currentPageNumber to total number of pages and break the function
    if (currentPageNumber > totalNumberOfPages) {
        currentPageNumber = totalNumberOfPages;
        return false;
    }

    // if page number is valid, show next page
    showPages(currentPageNumber);
}

// show previous page
function showPrev() {
    // decrease current page number
    currentPageNumber--;

    // if page number overflows, prevent overflowing, set currentPageNumber to total number of pages and break the function
    if (currentPageNumber == 0) {
        currentPageNumber = 1;
        return false;
    }

    // if page number is valid, show previous page
    showPages(currentPageNumber);
}
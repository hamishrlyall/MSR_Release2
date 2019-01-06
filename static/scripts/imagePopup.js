$(document).ready(function () {

    // Gets the video src from the data-src on each button
    var $imageSrc;
    $('img').click(function () {
        $imageSrc = $(this).attr('src');
    });
    console.log($imageSrc);



    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function (e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get

        $("#image").attr('src', $imageSrc);
    })


    // reset the modal image
    $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#image").attr('src', '');
    })
});

$(document).ready(function () {
    $("#slides").carousel({ interval: 9999999999999 });
});
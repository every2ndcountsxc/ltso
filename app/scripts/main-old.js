$(document).ready(function() {

    'use strict';

    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
            viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
            document.body.addEventListener('gesturestart', function () {
                viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
            }, false);
        }
    }

    $('#digits').countdown('2015/02/23 20:34:56', function(event) {
        $(this).html(event.strftime('<div class="digit-wrap"><div class="digit">%H </div><div class="time-type">HOURS</div></div><div class="colon">:</div><div class="digit-wrap"><div class="digit">%M</div><div class="time-type">MINUTES</div></div><div class="colon">:</div><div class="digit-wrap"><div class="digit digit-last">%S</div><div class="time-type">SECONDS</div></div>'));
        $(".digit").lettering();
    });

    if(!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function() {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }



    // FORM CODE //

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('.modal-content');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        $('#myModal').modal('show');

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData,
            success: function(response) {

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#number-of-leads').val('');
                $('#phone-number').val('');
                $('#email-address').val('');
            },
            error: function(data) {

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            }
        })

    });



});

$('.modal-close').on('click', function() {
    $('#myModal').modal('hide');
    $('.modal-content').html('');
});

$("a[data-target=#myModal]").click(function(ev) {
    ev.preventDefault();
    var target = $(this).attr("href");

    // load the url and show modal on success
    $("#myModal .modal-content").load(target, function() {
        $("#myModal").modal("show");
    });
});

$('.modal').on('hidden.bs.modal', function() {
    $('.modal-content').html('');
});




(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 1024px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function () {

        var $body = $('body'),
            $header = $('#header'),
            $nav = $('#nav'), $nav_a = $nav.find('a'),
            $wrapper = $('#wrapper');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function () {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Header.
        var ids = [];

        // Set up nav items.
        $nav_a
            .scrolly({offset: 44})
            .on('click', function (event) {

                var $this = $(this),
                    href = $this.attr('href');

                // Not an internal link? Bail.
                if (href.charAt(0) != '#')
                    return;

                // Prevent default behavior.
                event.preventDefault();

                // Remove active class from all links and mark them as locked (so scrollzer leaves them alone).
                $nav_a
                    .removeClass('active')
                    .addClass('scrollzer-locked');

                // Set active class on this link.
                $this.addClass('active');

            })
            .each(function () {

                var $this = $(this),
                    href = $this.attr('href'),
                    id;

                // Not an internal link? Bail.
                if (href.charAt(0) != '#')
                    return;

                // Add to scrollzer ID list.
                id = href.substring(1);
                $this.attr('id', id + '-link');
                ids.push(id);

            });

        // Initialize scrollzer.
        $.scrollzer(ids, {pad: 300, lastHack: true});

        // Off-Canvas Navigation.

        // Title Bar.
        $(
            '<div id="titleBar">' +
            '<a href="#header" class="toggle"></a>' +
            '<span class="title">' + $('#logo').html() + '</span>' +
            '</div>'
        )
            .appendTo($body);

        // Header.
        $('#header')
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'right',
                target: $body,
                visibleClass: 'header-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#titleBar, #header, #wrapper')
                .css('transition', 'none');

    });

})(jQuery);

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    document.getElementById("phone_no").value = "";
}

function submitForm(data) {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();
    var phone = document.getElementById("phone_no").value.trim();

    if (form_validation(name, email, phone, subject, message)) {
        var $contactForm = $('#contact_me_form');
        $.ajax({
            url: "https://formspree.io/muzammilsharif5319@gmail.com",
            method: "POST",
            data: {
                name: name,
                subject: "muhammadmuzammilsharif.github.io: " + subject,
                email: email,
                replyto: email,
                phone: phone,
                message: message
            },
            dataType: "json",
            beforeSend: function() {
                $contactForm.append('<div class="alert--loading"><span style="float: left">Sending Email </span><div class="loader"></div></div>');
            },
            success: function(data) {
                $contactForm.find('.alert--loading').hide();
                $contactForm.append('<div class="alert--alert--success">Message sent!</div>');
                clearForm();
            },
            error: function(err) {
                $contactForm.find('.alert--loading').hide();
                $contactForm.append('<div class="alert--alert--error">Ops, there was an error.</div>');
            }
        })
    }
}

function form_validation(name, email, phone, subject, msg) {
    var validity = true;
    /*Name Validation*/
    var div = document.getElementById("name_error");
    if (name.trim().length <= 2) {
        div.style.visibility = 'visible';
        div.style.display = 'block';
        validity = false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
    }

    /*Email not empty Validation*/
    div = document.getElementById("email_error");
    if (email.trim().length <= 0) {
        document.getElementById("email_error_span").innerHTML = " &nbsp;Please provide email";
        div.style.visibility = 'visible';
        div.style.display = 'block';
        document.getElementById("email").addEventListener("input", emailValidityChecker);
        validity = false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
    }

    /*Phone empty validation*/
    div = document.getElementById("phone_error");
    if (phone.trim().length <= 0) {
        document.getElementById("phone_error_span").innerHTML = " &nbsp;Please provide phone number";
        div.style.visibility = 'visible';
        div.style.display = 'block';
        document.getElementById("phone_no").addEventListener("input", phoneValidityChecker);
        validity = false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
    }

    /*Subject validation*/
    div = document.getElementById("subject_error");
    if (subject.trim().length <= 0) {
        div.style.visibility = 'visible';
        div.style.display = 'block';
        validity = false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
    }

    /*message validation*/
    div = document.getElementById("msg_error");
    if (msg.trim().length <= 0) {
        div.style.visibility = 'visible';
        div.style.display = 'block';
        validity = false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
    }

    if (!validity) {
        return validity;
    }

    /*Email validation*/
    if (!emailValidityChecker()) {
        validity = false;
    }

    /*phone validation*/
    if (!phoneValidityChecker()) {
        validity = false;
    }
    return validity;
}

function emailValidityChecker() {
    var email = document.getElementById("email").value;
    var div = document.getElementById("email_error");
    if (!validateEmail(email)) {
        document.getElementById("email_error_span").innerHTML = " &nbsp;Please provide valid email.";
        div.style.visibility = 'visible';
        div.style.display = 'block';
        document.getElementById("email").addEventListener("input", emailValidityChecker);
        return false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        return true;
    }
}

function phoneValidityChecker() {
    var phone = document.getElementById("phone_no").value;
    var div = document.getElementById("phone_error");
    if (!phoneNoValidation(phone)) {
        document.getElementById("phone_error_span").innerHTML = " &nbsp;Please provide valid phone number.";
        div.style.visibility = 'visible';
        div.style.display = 'block';
        document.getElementById("phone_no").addEventListener("input", phoneValidityChecker);
        return false;
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        return true;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function phoneNoValidation(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
    return re.test(String(phone).toLowerCase());
}

function phoneValidation(arg) {
    var phone = document.getElementById("phone_no").value;
    var numb = phone.match(/[\d+]/g);
    numb = numb.join("");
    document.getElementById("phone_no").value = numb;
}
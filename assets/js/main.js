(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 1024px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $body = $('body'),
			$header = $('#header'),
			$nav = $('#nav'), $nav_a = $nav.find('a'),
			$wrapper = $('#wrapper');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			var ids = [];

			// Set up nav items.
				$nav_a
					.scrolly({ offset: 44 })
					.on('click', function(event) {

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
					.each(function() {

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
				$.scrollzer(ids, { pad: 300, lastHack: true });

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

function submitForm(data) {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();
    var phone = document.getElementById("phone_no").value.trim();

    if (form_validation(name, email, phone, subject, message)) {
        /*Email.send(email, "muzammilsharif5319@gmail.com", "muhammadmuzammilsharif.github.io: " + subject, message,
            "smtp.elasticemail.com", "muzammilsharif5319@gmail.com", "81dea4f3-48a2-4aaa-8b7b-5c758e85e19f",
            function done(message) {
                alert(message);
            });*/
       /* var api_key = 'key-e7e2b6730c78caf2cad626dd5fe528ea';
        var domain = 'sandbox5a591795f08f4923aa71d3fa222fedb8.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


        mailgun.messages().send({
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'serobnic@mail.ru',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!'
        }, function (error, body) {
            console.log(body);
        });*/
        $.ajax('https://api:key-e7e2b6730c78caf2cad626dd5fe528ea@api.mailgun.net/v3/sandbox5a591795f08f4923aa71d3fa222fedb8.mailgun.org/messages',
            {
                type: "POST",
                api: 'key-e7e2b6730c78caf2cad626dd5fe528ea',
                username: name,
                password: 'key-e7e2b6730c78caf2cad626dd5fe528ea',
                data: {
                    "html": message,
                    "subject": subject,
                    "from": email,
                    "to": "muzammilsharif5319@gmail.com"
                },
                success: function (a, b, c) {
                    console.log('mail sent: ', b);
                }.bind(this),
                error: function (xhr, status, errText) {
                    console.log('mail sent failed: ', xhr.responseText);
                }
            });
        /*$.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': '308dcf488bfe6422a6c2c33b76c1dd3c-us17',
                'message': {
                    'from_email': email,
                    'to': [
                        {
                            'email': 'muzammilsharif5319@gmail.com',
                            'name': 'RECIPIENT NAME (OPTIONAL)',
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': subject,
                    'html': message
                }
            }
        }).done(function (response) {
            alert(response); // if you're into that sorta thing
        });*/
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
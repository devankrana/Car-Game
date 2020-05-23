$(function () {
    "use strict"
    var anim_id;
    var container = $('#container'),
        line = $('#line'),
        line_1 = $('#line-1'),
        line_2 = $('#line-2'),
        line_3 = $('#line-3'),
        car = $('#car'),
        car_1 = $('#car-1'),
        car_2 = $('#car-2'),
        car_3 = $('#car-3'),
        restart_div = $("#restart-div"),
        restart_btn = $("#restart"),
        score = $("#score");


    // some initial settings

    var container_left = parseInt(container.css('left')),
        container_width = parseInt(container.css('width')),
        container_height = parseInt(container.css('height')),
        car_width = parseInt(car.css('width')),
        car_height = parseInt(car.css('height'));

    // some other variables

    var game_over = false,
        score_counter = 1,
        car_speed = 2,
        line_speed = 5;

    // game coding
    $(window).on('keydown', function (e) {
        var key = e.which;
        if (game_over == false) {
            if (key == 37) {
                if (parseInt(car.css('right')) < (container_width - car_width - 20)) {
                    car.animate({
                        left: "-=20px"
                    }, 30);
                }

            } else if (key == 39) {
                if (parseInt(car.css('left')) < (container_width - car_width - 20)) {
                    car.animate({
                        left: "+=20px"
                    }, 30);
                }
            } else if (key == 38) {
                if (parseInt(car.css('bottom')) < (container_width - car_width - 20)) {
                    car.animate({
                        top: "-=20px"
                    }, 30);
                }
            } else if (key == 40) {
                if (parseInt(car.css('top')) < (container_width - car_width - 20)) {
                    car.animate({
                        top: "+=20px"
                    }, 40);
                }
            }
        } else {
            if (key == 13) {
                window.location.reload(true);
            }
        }
    });

     anim_id = requestAnimationFrame(repeat);
    function repeat() {
        if (game_over == false) {
            score_counter++;
            if (score_counter % 20 == 0) {
                score.text(parseInt(score.text()) + 1)

            }
            if (score_counter % 300 == 0) {
                car_speed++;
                line_speed++;
            }
            if (collapsion(car, car_1) || collapsion(car, car_2) || collapsion(car, car_3)) {
                stop_game();
                console.log(game_over);

            }
            car_down(car_1);
            car_down(car_2);
            car_down(car_3);

            line_down(line_1);
            line_down(line_2);
            line_down(line_3);
            anim_id = requestAnimationFrame(repeat);
        }
    };
    function car_down(car) {
        console.log("active");
         var current_top = parseInt(car.css('top'));
        if (current_top > (container_height + 150)) {
        current_top = -300;
        var car_left = Math.floor(Math.random() * (container_width - car_width));
        }
        car.css('left', car_left);
        car.css('top', current_top + car_speed);

    }
    function line_down(line) {
        console.log("line active");

        var l_current_top = parseInt(line.css('top'));
        if (l_current_top > (container_height + 150)) {
            l_current_top = -300;
        }
        line.css('top', l_current_top + line_speed);
    }
    function stop_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        restart_div.slideDown();
        restart_btn.focus();
    }
    restart_div.click(function () {
        window.location.reload(true)
    });

    // finish coding
    function collapsion(elem1, elem2) {
        var d1_offset             = elem1.offset();
	var d1_height             = elem1.outerHeight( true );
	var d1_width              = elem1.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = elem2.offset();
	var d2_height             = elem2.outerHeight( true );
	var d2_width              = elem2.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
    }
});    

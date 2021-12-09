$(function () {

    function getX() {
        if ($("input[type='radio']").is(":checked")) {
            return parseFloat($("input[type='radio']:checked").val());
        } else {
            return NaN;
        }
    }

    function getY() {
        let y = $(".y-value").val();
        let regex = /^[+-]?[0-9]{1,10}([.]?[0-9]{1,10})?$/;
        if (y.match(regex)) {
            return parseFloat(y);
        } else {
            return NaN;
        }
    }

    function getR() {
        let r = $(".r-value").val();
        let regex = /^[+-]?[0-9]{1,10}([.]?[0-9]{1,10})?$/;
        if (r.match(regex)) {
            return parseFloat(r);
        } else {
            return NaN;
        }
    }

    function validateX() {
        if ($("input[type='radio']").is(":checked")) {
            $("input[type='radio'] label").removeClass("radio-error");
            return true;
        } else {
            $("input[type='radio'] label").addClass("radio-error");
            return false;
        }
    }

    function validateY() {
        const MIN_Y = -3;
        const MAX_Y = 3;
        if (getY() >= MIN_Y && getY() <= MAX_Y) {
            $(".y-value").removeClass('text-error');
            return true;
        } else {
            $(".y-value").addClass('text-error');
            return false;
        }
    }

    function validateR() {
        const MIN_R = 2;
        const MAX_R = 5;
        if (getR() >= MIN_R && getR() <= MAX_R) {
            $(".r-value").removeClass('text-error');
            return true;
        } else {
            $(".r-value").addClass('text-error');
            return false;
        }
    }

    function validateData() {
        let x = validateX();
        let y = validateY();
        let r = validateR();
        return x && y && r;
    }

    document.getElementById("form:submit").addEventListener("click", function () {
        validateData();
    })

    // function checkAnswer() {
    //     return rectangle() || triangle() || circle();
    // }

    // function rectangle() {
    //     return param_x <= 0 && param_y <= 0 && param_x >= -param_r && param_y >= -param_r;
    // }
    //
    // function triangle() {
    //     return param_x >= 0 && param_y <= 0 && param_y >= param_x - param_r / 2;
    // }
    //
    // function circle() {
    //     return param_x <= 0 && param_y >= 0 && Math.sqrt(param_x * param_x + param_y * param_y) <= param_r;
    // }
});
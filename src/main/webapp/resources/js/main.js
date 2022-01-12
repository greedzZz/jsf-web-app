$(function () {

    function getX() {
        let x = document.getElementById("form:x-value").value;
        if (!isNaN(parseFloat(x)) && isFinite(parseFloat(x))) {
            return x;
        } else {
            return NaN;
        }
    }

    function getY() {
        let y = document.getElementById("form:y-value").value;
        let regex = /^[+-]?[0-9]{1,10}([.]?[0-9]{1,10})?$/;
        if (y.match(regex)) {
            return parseFloat(y);
        } else {
            return NaN;
        }
    }

    function getR() {
        let r = document.getElementById("form:r-value").value;
        let regex = /^[+-]?[0-9]{1,10}([.]?[0-9]{1,10})?$/;
        if (r.match(regex)) {
            return parseFloat(r);
        } else {
            return NaN;
        }
    }

    function validateX() {
        if ($("input[type='radio']").is(":checked")) {
            $("input[type='radio']").removeClass("radio-error");
            return true;
        } else {
            $("input[type='radio']").addClass("radio-error");
            return false;
        }
    }

    function validateY() {
        const MIN_Y = -3;
        const MAX_Y = 3;
        if (getY() >= MIN_Y && getY() <= MAX_Y) {
            $("#y-value").removeClass('text-error');
            return true;
        } else {
            $("#y-value").addClass('text-error');
            return false;
        }
    }

    function validateR() {
        const MIN_R = 2;
        const MAX_R = 5;
        if (getR() >= MIN_R && getR() <= MAX_R) {
            $("#r-value").removeClass('text-error');
            return true;
        } else {
            $("#r-value").addClass('text-error');
            return false;
        }
    }

    function validateData() {
        let x = validateX();
        let y = validateY();
        let r = validateR();
        return x && y && r;
    }

    function checkAnswer() {
        return rectangle() || triangle() || circle();
    }

    function rectangle() {
        return getX() <= 0 && getY() <= 0 && getX() >= -getR() && getY() >= -getR();
    }

    function triangle() {
        return getX() >= 0 && getY() <= 0 && getY() >= 2 * getX() - getR();
    }

    function circle() {
        return getX() <= 0 && getY() >= 0 && Math.sqrt(getX() * getX() + getY() * getY()) <= getR();
    }

    function drawPoint(x, y, r, fill) {
        let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", (193 + x * 140 / r).toString());
        point.setAttribute("cy", (193 - y * 140 / r).toString());
        point.setAttribute("r", (4).toString());
        point.setAttribute("fill-opacity", "0.85");
        point.setAttribute("fill", fill);
        point.classList.add("point");
        $("svg").append(point);
    }

    function drawPoints() {
        document.querySelectorAll(".point").forEach(point => point.remove());
        $(".data-table tbody tr").each(function () {
            let x = parseFloat($(this).find("td:nth-child(1)").text());
            let y = parseFloat($(this).find("td:nth-child(2)").text());
            let r = parseFloat($(this).find("td:nth-child(3)").text());
            let hit = $(this).find("td:nth-child(6)").text();
            if (!isNaN(x) && !isNaN(y)) {
                if (getR() === r) {
                    if (hit.includes("true")) {
                        drawPoint(x, y, r, "#26ffdf");
                    } else {
                        drawPoint(x, y, r, "#f26a1b");
                    }
                } else {
                    drawPoint(x, y, getR(), "#025159");
                }
            }
        })
    }

    $("svg").click(function (e) {
        if (validateR()) {
            let x = (e.offsetX - 193) * getR() / 140;
            let y = (193 - e.offsetY) * getR() / 140;
            document.getElementById("form:x-value").value = x.toFixed(1);
            document.getElementById("form:y-value").value = y.toFixed(1);
            document.getElementById("form:submit").click();
        } else {
            alert("Choose a valid R value.");
        }
    })

    document.querySelectorAll("input[type='radio']").forEach(x => x.addEventListener("click", function () {
        document.getElementById("form:x-value").value = x.value;
    }))

    document.getElementById("form:submit").addEventListener("click", function () {
        if (validateData()) {
            drawPoints();
            if (checkAnswer()) {
                drawPoint(getX(), getY(), getR(), "#26ffdf");
            } else {
                drawPoint(getX(), getY(), getR(), "#f26a1b");
            }
        }
    })

    document.getElementById("form:reset").addEventListener("click", function () {
        document.querySelectorAll(".point").forEach(point => point.remove());
    })

    document.getElementById("form:x-value").value = -4;
    document.querySelector("input[type='radio']").checked = true;
    if (parseFloat($(".data-table tbody tr").last().find("td:nth-child(3)").text()) >= 2 &&
        parseFloat($(".data-table tbody tr").last().find("td:nth-child(3)").text()) <= 5) {
        document.getElementById("form:r-value").value =
            parseFloat($(".data-table tbody tr").last().find("td:nth-child(3)").text());
    } else {
        document.getElementById("form:r-value").value = 0;
    }
    drawPoints();
});
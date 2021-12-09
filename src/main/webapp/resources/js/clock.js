$(function () {
    function time() {
        let date = new Date();
        let currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        $(".date").html(currentDate);
        $(".time").html(date.toTimeString().slice(0, 8));
    }
    time();
    setInterval(time, 5000)
});
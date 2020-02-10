function showUserExpand(event) {
    event = event || window.event;
    event.stopPropagation();
    var div = $("#ulUserOp");
    if (div.css("display") == "none") {
        div.slideDown();
    } else {
        div.slideUp();
    }
}
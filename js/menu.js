/// <reference path="jquery.min.js" />
/// <reference path="../layer/layer.js" />
$(document).ready(function () {
    $("a[btn=leftMenu]").each(function () {
        $(this).unbind();
        $(this).click(function () {
            var index = layer.load("正在加载中... ...");
            $("#content").load($(this).attr("url"), function () {
                layer.close(index);
            });
        });
    });
    $("a[btn=topMenu]").each(function () {
        $(this).unbind();
        $(this).click(function () {
            $(this).parent().siblings().each(function () {
                $(this).removeClass("active");
            });
            $(this).parent().addClass("active");
            var index = layer.load("正在加载中... ...");
            $("#realCenter").load($(this).attr("url"), function () {
                layer.close(index);
            });
        });
    });
});
function navigateContent(url) {
    var index = layer.load("正在加载中... ...");
    $("#content").load(url, function () {
        layer.close(index);
    });
}
function showRightLayer(id, width, url, className) {
    var y = document.body.clientWidth;
    var height = document.body.clientHeight - 100;
    var div = $("#" + id);
    if (className != undefined) {
        className = "needClose " + className;
    } else {
        className = "needClose";
    }
    if (div.length == 0) {
        div = $("<div id='" + id + "' class='" + className + "' style='position: absolute;top:100px;left:" + y + "px;z-index:9999;width:" + width + "px;height:auto;max-width:" + width + "px;max-height:" + height + "px;overflow: auto;'></div>");

    } else {
        div.html("");
    }

    div.click(function (event) {
        //层内的link点击事件，注意让事件停止冒泡  
        event = event || window.event;
        event.stopPropagation();
    });

    //$(document.body).append(div);
    var index = layer.load("正在加载中... ...");
    div.load(url, function () {
        layer.close(index);
        $(document.body).append(div);
        div.animate({ left: (y - width - 20) + "px" });
    });
}

function showSolutionDetail(id) {
    if (id == undefined) {
        id = 0;
    }
    showRightLayer("solutionDetail", 400, "/Integration/SolutionDetail?solutionID=" + id);
}
function showRoomDetail(id) {
    if (id == undefined) {
        id = 0;
    }
    showRightLayer("RoomDetail", 400, "/Room/RoomDetail?roomID=" + id);
}
function showDeviceDetail(id) {
    if (id == undefined) {
        id = 0;
    }
    showRightLayer("DeviceDetail", 400, "/Device/DeviceDetail?deviceID=" + id);
}

function showVersionDetail(id) {
    if (id == undefined) {
        id = 0;
    }
    showRightLayer("versionDetail", 400, "/Version/VersionDetail?versionID=" + id);
}

function showVersionStatus(id) {
    if (id == undefined) {
        id = 0;
    }
    showRightLayer("versionStatus", 400, "/Version/VersionStatusUpdate?versionID=" + id);
}
function showBranches(versionID) {
    showRightLayer("branches", 600, "/Version/Branches?versionID=" + versionID);
}
function showSubmitTest(versionID) {
    showRightLayer("submitTest", 600, "/Version/SubmitTest?versionID=" + versionID);
}

function showSubjectDetail(id) {
    if (id == undefined) {
        id = 0;
    }
    showRightLayer("subjectDetail", 400, "/Subject/SubjectDetail?id=" + id);
}
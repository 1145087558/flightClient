/// <reference path="menu.js" />
/// <reference path="jquery.min.js" />
/// <reference path="jquery-ui.min.js" />
/// <reference path="stringTool.js" />
/// <reference path="../layer/layer.js" />
var currentTeam = 0;
var parentTeam = 0;
function openTeam(id, btn) {
    var i = $(btn).children("i").first();
    if (i.hasClass("icon-folder-close")) {
        var div = $("<div></div>");
        var index = layer.load("正在加载... ...");
        div.load("/Team/TeamItem?id=" + id, function (response) {
            layer.close(index);

            var p = $(btn).parent().parent().children("div").last().html(response);
            i.removeClass("icon-folder-close");
            i.addClass("icon-folder-open");
        });
    } else {
        $(btn).parent().parent().children("div").last().html("");

        i.removeClass("icon-folder-open");
        i.addClass("icon-folder-close");
    }
}
function writeTeam() {
    var name = $("#txtTeamName").val();
    var remark = $("#txtTeamRemark").val();
    $.ajax({
        url: "/Team/WriteTeam",
        data: { id: currentTeam, parentId: parentTeam, name: name, remark: remark },
        //dataType: "json",
        cache: false,
        type: "POST",
        success: function (msg) {
            layer.msg(msg);
        }, error: function (e) {
            layer.msg(e);
        }
    });
}
function showUserOpDiv(id) {
    $("span[userid=" + id + "]").show();
}
function closeUserOpDiv(id, obj, e) {
    if (e.currentTarget) {
        if (e.relatedTarget && e.relatedTarget != obj) {
            if (obj != e.relatedTarget.parentNode) {
                $("span[userid=" + id + "]").hide();
            }
        }
    } else {
        if (e.toElement != obj) {
            if (obj != e.toElement.parentNode) {
                $("span[userid=" + id + "]").hide();
            }
        }
    }
}
function showTeamOpDiv(id) {
    $("span[teamid=" + id + "]").show();
}
function closeTeamOpDiv(id, obj, e) {
    if (e.currentTarget) {
        if (e.relatedTarget && e.relatedTarget != obj) {
            if (obj != e.relatedTarget.parentNode) {
                $("span[teamid=" + id + "]").hide();
            }
        }
    } else {
        if (e.toElement != obj) {
            if (obj != e.toElement.parentNode) {
                $("span[teamid=" + id + "]").hide();
            }
        }
    }
}
function showTeamDetail(id) {
    currentTeam = id;
    parentTeam = 0;
    if ($("#userdetaiDiv").length == 1) {
        $("#userdetaiDiv").remove();
        currentuser = 0;
    }
    showRightLayer("teamdetailDiv", 400, "/Team/TeamDetail?id=" + id);
}
function deleteTeam(id) {
    $.ajax({
        url: "/Team/DeleteTeam",
        data: { id: id },
        //dataType: "json",
        cache: false,
        type: "POST",
        success: function (msg) {
            layer.msg(msg);
        }, error: function (e) {
            layer.msg(e);
        }
    });
}
function createTeamLower(id) {
    currentTeam = 0;
    parentTeam = id;
    showRightLayer("teamdetailDiv", 400, "/Team/TeamDetail");
}
function closeTeamDetail(btn) {
    currentTeam = 0;
    parentTeam = 0;
    var div = $("#teamdetailDiv");
    if (div.length == 1) {
        div.remove();
    } else {
        $(btn).parent().parent().parent().parent().remove();
    }
}
$("#btnCreateTeam").click(function () {
    currentTeam = 0;
    parentTeam = 0;

    showRightLayer("teamdetailDiv", 400, "/Team/TeamDetail");
});
function createTeamUser(id) {
    currentTeam = id;
    parentTeam = 0;
    currentuser = 0;
    showRightLayer("userdetaiDiv", 400, "/Team/UserDetail");
}
var currentuser = 0;
function writeUser() {
    var name = $("#txtCreateUserName").val();
    var loginid = $("#txtCreateUserLoginID").val();
    var gender = $("#selCreateUserGender").val();
    var role = 0;

    if (isNullOrEmpty(loginid)) {
        layer.msg("成员账号不能为空呢，你快检查下！");
        $("#txtCreateUserName").focus();
        return;
    }
    if (isNullOrEmpty(name)) {
        layer.msg("成员姓名不能为空呢，你快检查下！");
        $("#txtCreateUserLoginID").focus();
        return;
    }

    $("input[name=cbCreateUserRole]:checked").each(function () {
        role += parseInt($(this).val());
    });

    $.ajax({
        url: "/Team/WriteUser",
        data: { id: currentuser, loginId: loginid, name: name, gender: gender, team: currentTeam, role: role },
        //dataType: "json",
        cache: false,
        type: "POST",
        success: function (msg) {
            layer.msg(msg);
        }, error: function (e) {
            layer.msg(e);
        }
    });
}
function showUserDetail(id) {
    currentTeam = 0;
    parentTeam = 0;
    currentuser = id;
    showRightLayer("userdetaiDiv", 400, "/Team/UserDetail?id=" + id);
}

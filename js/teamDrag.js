/// <reference path="jquery-ui.min.js" />
$("div[class=team-item-heading]").each(function () {
    $(this).unbind();
    $(this).draggable({
        appendTo: "body",
        helper: "clone"
    });
    $(this).droppable({
        drop: function (event, ui) {
            var currentTeamName = $(this).attr("teamname");
            var currentTeamID = $(this).attr("teamid");
            var dragId;
            var dragName;
            // 异动用户
            if (ui.draggable.hasClass("team-user")) {
                dragId = ui.draggable.attr("userid")
                dragName = ui.draggable.attr("username");
                // 不能用layer.confirm，因为他不阻止当前线程，会导致drop方法执行完成
                if (confirm('您确定要将成员[' + dragName + "]异动到团队[" + currentTeamName + "]吗?")) {
                    ui.draggable.appendTo($(this).next());
                    $.ajax({
                        url: "/Team/ChangeUserTeam",
                        data: { userID: dragId, newTeamID: currentTeamID },
                        //dataType: "json",
                        cache: false,
                        type: "POST",
                        success: function (msg) {
                            layer.msg(msg);
                        }, error: function (e) {
                            layer.msg(e);
                        }
                    });
                } else {
                    ui.draggable.revert = "valid";
                }
            } else if (ui.draggable.hasClass("team-item-heading")) {
                dragId = ui.draggable.attr("teamid")
                dragName = ui.draggable.attr("teamname");
                // 不能用layer.confirm，因为他不阻止当前线程，会导致drop方法执行完成
                if (confirm('您确定要将团队[' + dragName + "]异动到团队[" + currentTeamName + "]吗?")) {
                    ui.draggable.parent().parent().appendTo($(this).next());
                    $.ajax({
                        url: "/Team/ChangeTeamParent",
                        data: { teamID: dragId, parentTeamID: currentTeamID },
                        //dataType: "json",
                        cache: false,
                        type: "POST",
                        success: function (msg) {
                            layer.msg(msg);
                        }, error: function (e) {
                            layer.msg(e);
                        }
                    });
                } else {
                    ui.draggable.revert = "valid";
                }
            }
        }
    });
});
$("div[class=team-user]").each(function () {
    $(this).unbind();
    $(this).draggable({
        appendTo: "body",
        helper: "clone"
    });
});
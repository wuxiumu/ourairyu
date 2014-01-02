;(function( window, $, undefined ) {

"use strict";

$(document).ready(function() {
  initEpisodeDialogs();
});

initDragDrop();

window.initEpisodeDialogs = function() {
  // 选择上传文件类型对话框
  $("#chooseFileType, #questionsManager")
    .dialog("option", "buttons", [
      {
        "text": "确定",
        "click": function() {
          var dlg = $(this);
          var url = $(":checked", dlg).attr("data-url");
          
          if ( url ) {
            location.href = url;
            dlg.dialog("close");                        
          }
          else {
            CM.alert("请先选择" + (this.id === "chooseFileType" ? "文件" : "试题") + "类型");
          }
        }
      },
      {
        "text": "取消",
        "click": function() {
          $(this).dialog("close");
        }
      }
    ]);

  // 上传试题
  $("#quizDocManager")
    .dialog("option", "buttons", [
      {
        "text": "确定",
        "click": function() {
          $(":submit", $(this)).click();
        }
      },
      {
        "text": "取消",
        "click": function() {
          $(this).dialog("close");
        }
      }
    ])
    .on("dialogopen", function() {
      var overlay = $(this).find(".overlay");

      overlay.css("line-height", overlay.height() + "px");
    });
};

// 打开上传文件对话框
$(".list-wrapper .comp_button").live("click", function() {
    var dlgId = $(this).attr("data-dialog");

    if ( dlgId ) {
        $("#" + dlgId).dialog("open");
        
        return false;
    }
});

if ( $.fn.tokenInput ) {
    // 添加知识点
    $("#episode_knowledge_tokens").tokenInput(
        "/admin/courses/"+$("#commonArea").attr("data-course")+"/episodes/"+$("#commonArea").attr("data-episode")+"/knowledge_json_list.json",{
            crossDomain: false,
            prePopulate: $("#episode_knowledge_tokens").data("pre"),
            placeholder: $("#episode_knowledge_tokens").attr("placeholder"),
            onAdd: submit_knowledges,
            onDelete: submit_knowledges,
            theme: "facebook",
            preventDuplicates: true
        });

    // 添加先行节点
    $("#episode_pre_episode_tokens").tokenInput(
        "/admin/courses/"+$("#commonArea").attr("data-course")+"/episodes/"+$("#commonArea").attr("data-episode")+"/pre_episode_candidate_json_list.json",{
            crossDomain: false,
            cacheDisabled: true,
            prePopulate: $("#episode_pre_episode_tokens").data("pre"),
            placeholder: $("#episode_pre_episode_tokens").attr("placeholder"),
            onAdd: submit_pre_episodes,
            onDelete: submit_pre_episodes,
            theme: "facebook",
            preventDuplicates: true
        });

    // 添加后续节点
    $("#episode_next_episode_tokens").tokenInput(
        "/admin/courses/"+$("#commonArea").attr("data-course")+"/episodes/"+$("#commonArea").attr("data-episode")+"/next_episode_candidate_json_list.json",{
            crossDomain: false,
            cacheDisabled: true,
            prePopulate: $("#episode_next_episode_tokens").data("pre"),
            placeholder: $("#episode_next_episode_tokens").attr("placeholder"),
            onAdd: submit_next_episodes,
            onDelete: submit_next_episodes,
            theme: "facebook",
            preventDuplicates: true
        });

    // 试题中添加知识点
    $("#question_knowledge_tokens").tokenInput(
        "/admin/courses/" + $("#commonArea").attr("data-course") + "/episodes/" + $("#commonArea").attr("data-episode") + "/learning_sources/" + $("#commonArea").attr("data-learning_source") + "/questions/" + $("#commonArea").attr("data-question") + "/knowledge_json_list.json",{
            crossDomain: false,
            prePopulate: $("#question_knowledge_tokens").data("pre"),
            placeholder: $("#question_knowledge_tokens").attr("placeholder"),
            onAdd: submit_knowledges,
            onDelete: submit_knowledges,
            theme: "facebook",
            preventDuplicates: true
        });

}

function submit_knowledges() {
    $("#knowledge_management").submit();
}

function submit_pre_episodes() {
    $("#pre_episode_management").submit();
}

function submit_next_episodes() {
    $("#next_episode_management").submit();
}

function initDragDrop() {
  var itemPointTop;               // 鼠标位置到被托起条目上边界的距离
  var lastedY;                    // 鼠标位置的上一次纵坐标
  var dir;

  $(".resource-list > li").live({
    "mousedown": function( e ) {
      var t = $(e.target);

      if ( !t.is(".button-admin") ) {
        $(this).addClass("dragging");

        itemPointTop = e.pageY - $(this).offset().top;
        lastedY = e.pageY;
      }
    }
  });

  $(document).bind({
    "mousemove": function( e ) {
      var d = $(".dragging");

      if ( d.size() ) {
        var list = $(".resource-list");
        var boundaryTop = list.offset().top;

        dir = e.pageY < lastedY ? -1 : 1;     // -1 为向上移动；1 为向下移动
        lastedY = e.pageY;

        if ( e.pageY > boundaryTop && e.pageY < (boundaryTop + list.outerHeight() - d.outerHeight() + itemPointTop) ) {
          // 添加占位
          if ( !$(".drag-placeholder").size() ) {
            $("body").addClass("txt-forbid");

            d
              .css({
                "position": "absolute",
                "z-index": "999999"
              })
              .after("<li class=\"drag-placeholder content-list-item\" />")
          }

          // 被拖动元素的位置
          d.css("top", (e.pageY - boundaryTop - itemPointTop));

          moveElement( e.pageY, dir, itemPointTop );
        }
      }
    },
    "mouseup": function( e ) {
      resetDrag();
    }
  });
}

function moveElement( y, dir, itemPointTop ) {
  var d = $(".dragging");
  var p = $(".drag-placeholder");
  var t;

  if ( dir > 0 ) {
    t = p.next();

    if ( t.size() && y > t.offset().top + t.outerHeight()/2 + itemPointTop - d.outerHeight() ) {
      d.before(t);
    }
  }
  else {
    t = p.prev().prev();
    
    if ( t.size() && y < (t.offset().top + t.outerHeight()/2 + itemPointTop) ) {
      p.after(t);
    }
  }
}

function resetDrag() {
  $("body").removeClass("txt-forbid");

  if ( $(".dragging").size() ) {
    $(".dragging")
      .css({
        "position": "static",
        "z-index": "auto",
        "top": "auto"
      })
      .removeClass("dragging");

    $(".drag-placeholder").remove();
  }
}

})( window, jQuery );

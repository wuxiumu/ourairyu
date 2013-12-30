;(function( window, $, undefined ) {

"use strict";

$(document).ready(function() {
  initEpisodeDialogs();

  calculateCoordinate();
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

function calculateCoordinate( item ) {
  if ( $(item).is(".content-list-item") ) {
    $(item).attr("data-coordinate", ($(item).offset().top));
  }
  else {
    $(".resource-list > li").each(function() {
      var li = $(this);

      if ( li.css("position") !== "absolute" ) {
        li.attr("data-coordinate", (li.offset().top));
      }
    });
  }
}

function initDragDrop() {
  $(".resource-list > li").live({
    "mousedown": function( e ) {
      var t = $(e.target);

      if ( !t.is(".button-admin") ) {
        $(this).addClass("dragging");
      }
    }
  });

  $(document).bind({
    "mousemove": function( e ) {
      if ( $(".dragging").size() ) {
        var ele = $(document.elementFromPoint(e.clientX, e.clientY)).closest(".content-list-item");

        // 添加占位
        if ( !$(".drag-placeholder").size() ) {
          $("body").addClass("txt-forbid");

          $(".dragging")
            .css({
              "position": "absolute",
              "z-index": "999999"
            })
            .after("<li class=\"drag-placeholder content-list-item\" />")
        }

        $(".dragging").css("top", (e.pageY - $(".resource-list").offset().top));

          console.log($(".area-display", ele).text());
        if ( ele.size() && !ele.is(".dragging") && !ele.is(".drag-placeholder") ) {
          if ( ele.index() > $(".drag-placeholder").index() ) {
            $(".drag-placeholder").before(ele);
          }
          else {
            $(".drag-placeholder").after(ele);
          }
        }
      }
    },
    "mouseup": function( e ) {
      $("body").removeClass("txt-forbid");

      if ( $(".dragging").size() ) {
        $(".dragging")
          .css({
            "position": "static",
            "z-index": "auto"
          })
          .removeClass("dragging");

        $(".drag-placeholder").remove();
      }
    }
  });
}

})( window, jQuery );

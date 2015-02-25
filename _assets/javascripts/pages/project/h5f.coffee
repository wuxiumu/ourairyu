$(document).ready ->
  targetForms = $("#H5FValidation form")
  
  H5F.errors
    UNKNOWN_INPUT_TYPE: "{{LABEL}}字段为未知类型"
    COULD_NOT_BE_EMPTY: "{{LABEL}}的值不能为空"
    LENGTH_SMALLER_THAN_MINIMUM: "{{LABEL}}的字符串长度请保持在在 {{MINLENGTH}}-{{MAXLENGTH}}"
    LENGTH_BIGGER_THAN_MAXIMUM: "{{LABEL}}的字符串长度请保持在在 {{MINLENGTH}}-{{MAXLENGTH}}"
    INVALID_VALUE: "{{LABEL}}的值{{VALUE}}为无效值"
    NOT_AN_ABSOLUTE_URL: "{{LABEL}}不符合 URL 的格式"
    NOT_AN_EMAIL: "{{LABEL}}不符合电子邮箱的格式"
    NOT_A_NUMBER: "{{LABEL}}不是数字"
    UNDERFLOW: "{{LABEL}}中所输入数字请在 {{MIN}}-{{MAX}} 范围内"
    OVERFLOW: "{{LABEL}}中所输入数字请在 {{MIN}}-{{MAX}} 范围内"
    DIFFERENT_VALUE: "{{LABEL}}的值没有与{{ASSOCIATE_LABEL}}保持一致"
    AT_LEAST_CHOOSE_ONE: "请从{{LABEL}}中选择一项"
    SHOOLD_BE_CHOSEN: "请选中{{UNIT_LABEL}}"

  H5F.init targetForms

  $("#H5FValidation [name]").on
    "H5F:valid": ( e, field ) ->
      $(field.element)
        .closest ".form-group"
        .removeClass "has-error"
        .children ".help-block"
        .hide()

    "H5F:invalid": ( e, field ) ->
      group = $(field.element).closest ".form-group"

      group.append("<p class=\"help-block\" />") if $(".help-block", group).size() is 0

      group
        .addClass "has-error"
        .children ".help-block"
        .show()
        .text field.message

  targetForms.on "H5F:submit", ( e, inst, sub ) ->
    console.log "submit"
    # sub.preventDefault()
    # sub.stopImmediatePropagation()
    return false

  f1 = $("#exampleForm_2")

  f1.on "H5F:submit", ->
    console.log "exampleForm_2 submit"
    return "exampleForm_2"

  f1_inst = H5F.get f1
  
  f1_inst.addValidation "nickname", {
      handler: ->
        return not isNaN Number(@value)
      message: "请输入数字"
    }

  f1_inst.addValidation "nickname", {
      handler: ->
        return @value.length > 5
      message: ->
        return "请保证字符串长度大于 5"
    }

  $("#exampleForm_3").on "H5F:submit", ->
    console.log "exampleForm_3 submit"
    return "exampleForm_3"

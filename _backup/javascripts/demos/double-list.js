// var t_1 = DoubleList({}),
// 	t_2 = new DoubleList({}),
// 	t_3 = DoubleList.create({});

// console.dir(t_1);
// console.dir(t_2);
// console.dir(t_3);
// console.log(t_1.constructor === t_2.constructor);
// console.log(t_1.create);
var dl = DoubleList.create({
	"element": $("ul"),
	"listTitle": { "alternative": "所有学生", "selected": "已选学生" },
	"buttons": [{ "text": "添加学生 &gt;", "action": "add" },
				{ "text": "&lt; 删除学生", "action": "delete" }],
	"data": [{
			"text": "1",
			"value": "1",
			"children": [{ "text": "1-1", "value": "1-1" },
						{ "text": "1-2", "value": "1-2" },
						{ "text": "1-3", "value": "1-3" }]
		}, {
			"text": "2",
			"value": "2",
			"children": [{ "text": "2-1", "value": "2-1" },
						{ "text": "2-2", "value": "2-2" },
						{ "text": "2-3", "value": "2-3" }]
		}, { "text": "3", "value": "3" } ]
});
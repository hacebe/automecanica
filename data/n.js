var data = {
	1: {"id" : 1, "parent" : 0, "type" : "T", "jan" : 0, "fev": 0, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	2: {"id" : 2, "parent" : 1, "type" : "T", "jan" : 0, "fev": 0, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	3: {"id" : 3, "parent" : 2, "type" : "T", "jan" : 0, "fev": 0, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	4: {"id" : 4, "parent" : 3, "type" : "A", "jan" : 1, "fev": 2, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	5: {"id" : 5, "parent" : 3, "type" : "A", "jan" : 2, "fev": 3, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	6: {"id" : 6, "parent" : 3, "type" : "A", "jan" : 3, "fev": 4, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	7: {"id" : 7, "parent" : 2, "type" : "T", "jan" : 0, "fev": 0, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
	8: {"id" : 8, "parent" : 7, "type" : "T", "jan" : 4, "fev": 5, "mar": 0, "abr": 0, "mai": 0, "jun": 0, "jul": 0, "ago": 0, "set": 0, "out": 0, "nov": 0, "dez": 0},
};

var months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
var currentMonth = 0;

function getYearTotal (init) {
	var all = [];

	for (var i = 0; i < months.length; i++) {
		all.push(getMonthTotal(i));
	};

	for (var i in data) {
		var item = data[i];
		var str = "";

		for (var key in item) {
			var value = item[key];

			str += value + ',';
		}

		console.log(str);
	}

	console.log(all.join(','));
}

function getMonthTotal ( m, s ) {
	if(!s) s = 0;

	var parentID = null;
	var month = months[m];

	for (var i in data) {
		var item = data[i];

		if(item.type == "A") {
			parentID = item.parent;

			while (parentID != null && data[parentID]) {

				data[parentID][month] += item[month];
				parentID = (data[parentID].parent) ? data[parentID].parent : null;
			}
		}
	}

	s += data[1][month];

	return s;
}

function deleteInvalidInput (c) {
	var keys = Object.keys(data);
	var a = [];

	for (var i = 0; i < keys.length; i++) {
		var item = data[keys[i]];

		if(item.type == "T")
			a.push(item);

		if(item.type == "A") {
			if(a.length && item.parent == a.slice(-1)[0].id) {
				a = [];
			}
		}
	};

	for (var i = 0; i < a.length; i++) {
		delete data[a[i].id];
	};

	if(c && typeof c == 'function') c();
}

//getYearTotal();
deleteInvalidInput(function () {
	console.log(data);
});
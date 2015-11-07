function getNodeValue ( node ) {
	var treeTotal = 0;

	function recursive ( node ) {
		var node = node || tree[0].children[0];

		if(node.children) {
			for (var i = 0; i < node.children.length; i++) {
				var children = node.children[i];

				if(children.tipo == "A" && children[monthName] !== "-") {
					treeTotal += children[monthName];
				}

				else {
					recursive (children);
				}
			};
		}
	}

	recursive (node);

	node.value = treeTotal;
}

function getTotal (node) {
	var node = node || tree[0].children[0];

	getNodeValue (node);

	if(node.children) {
		for (var i = 0; i < node.children.length; i++) {
			var children = node.children[i];

			if(children.tipo == "T") {

				getNodeValue (children);

				if(children.children)
					getTotal (children)
			}
		};
	}
}

function getMonth (month) {
	var months = [
		'jan',
		'fev',
		'mar',
		'abr',
		'mai',
		'jun',
		'jul',
		'ago',
		'set',
		'out',
		'nov',
		'dez'
	];

	var currentMonth = --month;

	window.monthName = months[currentMonth];

	console.log(window.monthName);

	getTotal();

	console.debug(tree[0].children[0].value.toFixed(2))
}
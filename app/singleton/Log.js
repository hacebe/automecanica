function Template (string) {
	this.string = string;
	this.gen = function (values) {
		return this.string.replace(/\{([^}]+)\}/g, function () {
			if(arguments[1] == 'name') {
				return user.name;
			}

			return values[arguments[1]];
		});
	}
}

var user = {
	name: null,
	setName : function ( name ) {
		this.name = name;
	},

	action : {
		login: new Template("O usuário {name} fez login com sucesso na empresa \"{0}\"."),
		updateDataFrom: new Template("O usuário {name} alterou o campo \"{0}\" de {1} para {2}."),
		logoff: new Template("O usuário {name} fez logoff com sucesso na empresa \"{0}\"."),
	}
}

var empresa = 'C E B';

user.setName('Rodrigo');

console.log(user.action.login.gen([empresa]));
console.log(user.action.updateDataFrom.gen(['valor', 200, 3000]));
console.log(user.action.logoff.gen([empresa]));
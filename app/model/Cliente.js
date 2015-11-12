Ext.define('AutoMecanica.model.Cliente', {
	extend:	'Ext.data.Model',

	fields: ['id', 'nome', 'endereco', 'email','telefone_fixo', 'telefone_celular1', 'telefone_celular2', 'cpf']
})
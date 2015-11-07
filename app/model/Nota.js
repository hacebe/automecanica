Ext.define('GestorFinanceiro.model.Nota', {
	extend:	'Ext.data.Model',

	fields:['id','numeronota','dataemissao','pis','cofins','inss','ir','csll','total','descontos','diferenca','tiponota',{type: 'date', name: 'unixdataemissao'}]
});
Ext.define('GestorFinanceiro.model.MapaNota', {
	extend:	'Ext.data.Model',

	fields: ['mes', 'ano', 'text'],

	proxy:{
		type: 'ajax',
		url: 'data/notas.php?module=getAllHeaders',
		//url: 'data/planocontas.json',
		reader: {
			type: 'json'
			//rootProperty: 'dados'
		}
	}

})
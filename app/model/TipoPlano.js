Ext.define('GestorFinanceiro.model.TipoPlano', {
	extend:	'Ext.data.Model',

	fields: ['id', 'nome'],	

	proxy:{
		type: 'ajax',
		url: 'data/planocontas.php?module=getTipos',
		//url: 'data/planocontas.json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
Ext.define('GestorFinanceiro.store.NaturezasFinanceiras',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.NaturezaFinanceira',

	proxy:{
		type: 'ajax',
		url: 'data/planocontasempresa.php?module=getNaturezas',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
Ext.define('GestorFinanceiro.store.Anexos',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Anexo',		

	autoLoad: false,

	proxy:{
		type: 'ajax',
		url: 'data/lancamento.php?module=getAttaches',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
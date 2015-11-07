Ext.define('GestorFinanceiro.store.Notas',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Nota',

	autoLoad: false,

	proxy:{
		type: 'ajax',
		url: 'data/notas.php?module=getNotas',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
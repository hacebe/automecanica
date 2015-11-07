Ext.define('GestorFinanceiro.store.Lancamentos',{
	extend: 'Ext.data.Store',

	model: 'GestorFinanceiro.model.Lancamento',

	proxy:{
		type: 'ajax',
		url: 'data/lancamento.php?module=getLancamentos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
 
})
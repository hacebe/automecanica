Ext.define('GestorFinanceiro.store.Extratos',{
	extend: 'Ext.data.Store',	


	model: 'GestorFinanceiro.model.Extrato',		

	proxy:{
		type: 'ajax',
		url: 'data/extrato.php?module=getExtrato',
		reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'error'
		}
	}
})
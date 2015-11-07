Ext.define('GestorFinanceiro.store.FluxoCaixa',{
	extend: 'Ext.data.Store',	
	//storeId: 'fluxocaixatore',

	model: 'GestorFinanceiro.model.FluxoCaixa',

	proxy:{
		type: 'ajax',
		url: 'data/fluxo.php?module=fluxo&output=json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}

 
})
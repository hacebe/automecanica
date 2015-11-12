Ext.define('AutoMecanica.store.FluxoCaixa',{
	extend: 'Ext.data.Store',	
	//storeId: 'fluxocaixatore',

	model: 'AutoMecanica.model.FluxoCaixa',

	proxy:{
		type: 'ajax',
		url: 'data/fluxo.php?module=fluxo&output=json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}

 
})
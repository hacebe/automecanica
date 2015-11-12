Ext.define('AutoMecanica.store.Extratos',{
	extend: 'Ext.data.Store',	


	model: 'AutoMecanica.model.Extrato',		

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
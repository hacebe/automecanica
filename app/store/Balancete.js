Ext.define('AutoMecanica.store.Balancete',{
	extend: 'Ext.data.Store',	
	//storeId: 'balancetestore',

	model: 'AutoMecanica.model.Balancete',

	proxy:{
		type: 'ajax',
		url: 'data/balancete.php?module=balancete&output=json',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}

 
})
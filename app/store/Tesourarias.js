Ext.define('AutoMecanica.store.Tesourarias',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Tesouraria',		

	proxy:{
		type: 'ajax',
		url: 'data/tesouraria.php?module=getAll',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
Ext.define('AutoMecanica.store.Socios',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Socio',		

	proxy:{
		type: 'ajax',
		url: 'data/socios.php?module=getSocios',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
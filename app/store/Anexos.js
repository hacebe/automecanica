Ext.define('AutoMecanica.store.Anexos',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Anexo',		

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
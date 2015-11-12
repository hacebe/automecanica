Ext.define('AutoMecanica.store.Notas',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Nota',

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
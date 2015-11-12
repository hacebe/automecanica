Ext.define('AutoMecanica.store.NaturezasFinanceiras',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.NaturezaFinanceira',

	proxy:{
		type: 'ajax',
		url: 'data/planocontasempresa.php?module=getNaturezas',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
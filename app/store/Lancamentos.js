Ext.define('AutoMecanica.store.Lancamentos',{
	extend: 'Ext.data.Store',

	model: 'AutoMecanica.model.Lancamento',

	proxy:{
		type: 'ajax',
		url: 'data/lancamento.php?module=getLancamentos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
 
})
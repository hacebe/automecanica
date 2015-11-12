Ext.define('AutoMecanica.store.Empresas',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Empresa',

	proxy:{
		type: 'ajax',
		url: 'data/empresa.php?module=getEmpresas',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
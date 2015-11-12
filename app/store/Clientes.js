Ext.define('AutoMecanica.store.Clientes',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Cliente',		

	proxy:{
		type: 'ajax',
		url: 'data/clientes.php?module=getClientes',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
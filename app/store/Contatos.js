Ext.define('AutoMecanica.store.Contatos',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Contato',		

	proxy:{
		type: 'ajax',
		url: 'data/contatos.php?module=getContatos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
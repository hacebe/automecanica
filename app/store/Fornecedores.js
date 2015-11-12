Ext.define('AutoMecanica.store.Fornecedores',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Fornecedor',		

	proxy:{
		type: 'ajax',
		url: 'data/fornecedores.php?module=getFornecedores',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
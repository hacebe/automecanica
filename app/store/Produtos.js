Ext.define('AutoMecanica.store.Produtos',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.Produto',		

	proxy:{
		type: 'ajax',
		url: 'data/produtos.php?module=getProdutos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
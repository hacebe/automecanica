Ext.define('GestorFinanceiro.store.Produtos',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Produto',		

	proxy:{
		type: 'ajax',
		url: 'data/produtos.php?module=getProdutos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
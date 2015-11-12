Ext.define('AutoMecanica.store.MovimentacoesEstoque',{
	extend: 'Ext.data.Store',	

	model: 'AutoMecanica.model.MovimentacaoEstoque',		

	proxy:{
		type: 'ajax',
		url: 'data/estoque.php?module=getMovimentacoes',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
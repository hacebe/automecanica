Ext.define('GestorFinanceiro.store.Fornecedores',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Fornecedor',		

	proxy:{
		type: 'ajax',
		url: 'data/fornecedores.php?module=getFornecedores',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
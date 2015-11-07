Ext.define('GestorFinanceiro.store.Contatos',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Contato',		

	proxy:{
		type: 'ajax',
		url: 'data/contatos.php?module=getContatos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
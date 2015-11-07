Ext.define('GestorFinanceiro.store.Clientes',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Cliente',		

	proxy:{
		type: 'ajax',
		url: 'data/clientes.php?module=getClientes',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
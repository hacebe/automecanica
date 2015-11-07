Ext.define('GestorFinanceiro.store.Socios',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Socio',		

	proxy:{
		type: 'ajax',
		url: 'data/socios.php?module=getSocios',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
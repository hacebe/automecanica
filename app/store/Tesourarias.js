Ext.define('GestorFinanceiro.store.Tesourarias',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Tesouraria',		

	proxy:{
		type: 'ajax',
		url: 'data/tesouraria.php?module=getAll',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
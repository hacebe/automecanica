Ext.define('GestorFinanceiro.store.Empresas',{
	extend: 'Ext.data.Store',	

	model: 'GestorFinanceiro.model.Empresa',

	proxy:{
		type: 'ajax',
		url: 'data/empresa.php?module=getEmpresas',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
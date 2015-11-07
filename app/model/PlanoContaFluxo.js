Ext.define('GestorFinanceiro.model.PlanoContaFluxo', {
	extend:	'Ext.data.Model',

	fields: ['id', 'cod', 'mask', 'parent', 'text', 'tipo', 'natureza'],	

	proxy:{
		type: 'ajax',
		url: 'data/planocontas.php?module=getAll',
		//url: 'data/planocontas.json',
		reader: {
			type: 'json',
			//rootProperty: 'dados'
		}
	}
})
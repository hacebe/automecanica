Ext.define('AutoMecanica.model.Extrato', {
	extend:	'Ext.data.Model',

	fields:[
			{type: 'date', name: 'unixdata'}, 
			'tipo', 
			'tipo_doc', 
			'n_lanc', 
			'n_doc', 
			'ref', 
			'complemento', 
			'natureza_financeira', 
			'valor_total' ]
});
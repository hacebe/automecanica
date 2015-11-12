Ext.define('AutoMecanica.model.MapaLancamento', {
	extend:	'Ext.data.Model',

	fields: ['mes', 'ano', 'text', 'tipo', 'tipo_doc', 'n_lanc', 'n_doc', 'ref', 'complemento', 'natureza_financeira', 'fonte_financeira', 'valor_doc', 'valor_juros', 'valor_multa', 'valor_desconto', 'valor_total', 'contacontabil', 'favorecido'],

	proxy:{
		type: 'ajax',
		url: 'data/lancamento.php?module=getAllHeaders',
		//url: 'data/planocontas.json',
		reader: {
			type: 'json'
			//rootProperty: 'dados'
		}
	}

})
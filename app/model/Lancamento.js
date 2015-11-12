Ext.define('AutoMecanica.model.Lancamento', {
	extend:	'Ext.data.Model',

	fields: ['id', 'empresa_id', 'data', 'tipo', 'tipo_doc', {name: 'n_lanc', type: 'int'}, {name: 'n_doc', type: 'int'}, 'ref', 'complemento', 'natureza_cat', 'natureza_financeira', 'fonte_financeira', 'valor_doc', 'valor_juros', 'valor_multa', 'valor_desconto', 'valor_total', 'contacontabil', 'favorecido', 'favorecido_nome', 'anexos', 'observacao']

})
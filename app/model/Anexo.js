Ext.define('GestorFinanceiro.model.Anexo', {
	extend:	'Ext.data.Model',

	fields: ['id', 'lancamento_id', 'empresa_id', 'nome_arquivo', 'tamanho', 'tipo', 'data_envio', 'local', 'empresa_id']

})
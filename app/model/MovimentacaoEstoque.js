Ext.define('AutoMecanica.model.MovimentacaoEstoque', {
	extend:	'Ext.data.Model',

	fields: ['id', 'datahora', 'unixdata', 'descricao', 'fornecedor', 'fornecedor_nome', 'usuario', 'usuario_nome','tipo', 'valor_total']


})
Ext.define('GestorFinanceiro.view.toolbar.SalvarEditarExcluirBuscaRevisado',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.salediexcbuscarevisado',

	flex:1,
	dock: 'top',

	items:[
		{text: 'Novo', itemId: 'novo'},
		{text: 'Salvar', itemId: 'salvar'},
		/*{text: 'Editar', itemId: 'editar'},*/
		{text: 'Excluir', itemId: 'excluir', disabled: true},
		'-',
		{text: 'Recarregar', itemId: 'refresh'},
		'-',
		{text: 'Marcar/Desmarcar como Revisado', itemId: 'revisado'},
		{xtype: 'tbfill'},
		{
			xtype: 'textfield',
			emptyText: 'Pesquisa Rápida',
			itemId: 'searchField'
		}/*,
		{
			text: 'Buscar',
			itemId: 'searchBtn'
		}*/
	],	
})

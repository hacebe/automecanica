Ext.define('AutoMecanica.view.toolbar.IncluirAlterarExcluirImportarExportarBusca',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.incaltexcimpexpbusca',

	flex:1,
	dock: 'top',

	items:[
		{text: 'Incluir', itemId: 'incluir'},
		{text: 'Excluir', itemId: 'excluir'},
		{text: 'Alterar', itemId: 'alterar'},
		'-',
		{text: 'Recarregar', itemId: 'refresh'},
		'-',
		{text: 'Importar', itemId: 'importar', disabled: true},
		{text: 'Exportar', itemId: 'exportar', disabled: true},
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

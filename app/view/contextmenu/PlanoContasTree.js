Ext.define('AutoMecanica.view.contextmenu.PlanoContasTree',{
	extend: 'Ext.menu.Menu',
	alias: 'widget.ctxmenuplanocontastree',

	items:[
		{
			text: 'Adicionar',
			iconCls: 'add',
			itemId: 'addbtn'
		},{
			text: 'Editar',
			iconCls: 'edit',
			itemId: 'editbtn'
		}/*,{
			text: 'Excluir',
			iconCls: 'delete',
			itemId: 'deletebtn'
		}*/
	]
});
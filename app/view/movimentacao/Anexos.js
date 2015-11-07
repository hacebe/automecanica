Ext.define("GestorFinanceiro.view.movimentacao.Anexos", {
	extend: 'Ext.panel.Panel',
	alias: 'widget.anexospanel',
	title:'Anexos',
	layout:{
		type:'vbox',
		align: 'stretch',
		pack: 'start'
	},
	items:[
		{
			xtype:'grid',
			flex: 1,
			store: Ext.create("GestorFinanceiro.store.Anexos"),

			columns: [
				{text: '', width: 32, dataIndex: 'tipo', 
					renderer: function(value, meta, record, rowindx, colindx, store) {
					    var extensions = ['xls', 'xlsx', 'doc', 'docx', 'txt', 'zip','rar','7z', 'gz', 'pdf', 'jpg', 'png', 'gif', 'bmp'];
					    if (extensions.indexOf(value) > -1) {
					        meta.css = 'icon-' + value;
					    }else{
					        meta.css = 'icon-unknown';
					    }
					    return '';
					}
				},
				{text: 'Arquivo', flex:2, dataIndex: 'nome_arquivo'},
				{text: 'Enviado em', flex:1, dataIndex: 'data_envio'},
				{text: 'Tamanho', dataIndex: 'tamanho', 
					renderer: function(value){
						return GestorFinanceiro.util.Util.humanFileSize(value, true);
					}
				},
				{
					xtype:'actioncolumn',
					width: 50,
					items:[
						{
							icon: 'resources/images/icon-delete.png',
							tooltip: 'Excluir',
							handler: function(grid, rowIndex, colIndex) {
			                    var rec = grid.getStore().getAt(rowIndex);
			                    //alert("Delete " + rec.get('nome_arquivo'));
			                    Ext.Ajax.request({
			                    	url: 'data/lancamento.php?module=deleteAttach',
			                    	params:{
			                    		attachID: rec.get('id')
			                    	},
			                    	success: function(fp, o){
			                    		GestorFinanceiro.util.Util.showToast('Anexo excluido');
			                    		grid.getStore().load();
			                    	}
			                    })
			                }
						},{
							icon: 'resources/images/arrow_down.png',
							tooltip: 'Baixar Arquivo',
							handler: function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);

			                    window.location='data/lancamento.php?module=downloadAttach&attachID=' + rec.get('id');
			                }
						}
					]
				}
			]
		},{
			xtype:'form',

			layout: 'hbox',
			defaults:{
				xtype: 'button',
				style: 'margin-left: 10px'
			},
			items:[
				{buttonText: 'Anexar arquivo', name: 'arquivo', itemId: 'attachFile', xtype:'filefield', buttonOnly: true, hideEmptyLabel: true, width:100},
				/*{text: 'Remover anexo', disabled: true, itemId: 'removeAttach'}*/
			]
		}
	]
					
})

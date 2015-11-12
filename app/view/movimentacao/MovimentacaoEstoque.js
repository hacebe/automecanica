Ext.define('AutoMecanica.view.movimentacao.MovimentacaoEstoque', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarmovestoque',

	config:{
		tipo: undefined,
	},

	width: 800,
	height: 530,

	title: 'Movimentaçao de Estoque',
	autoShow: true,		
	layout: 'fit',
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			xtype:'form',
			/*bodyPadding: '10px',*/
			layout: 'border',

			dockedItems: [
				{
					xtype:'incaltexcimpexpbusca'
				}
			],

			items:[
				/*{					
					//Tree Anos
					xtype: 'treepanel',

					itemId: 'treeanosnotas',
					region: 'west',
					weight: 50,					
					collapsible: false,
					width: 110,					
					minWidth: 110,
					store: 'MapaNotas',
					rootVisible: false
				
				},*/
				{		
					collapsible: false,
					region: 'center',
					xtype: 'grid',
					store: 'MovimentacoesEstoque',
					//store: Ext.create("Ext.data.Store"),										
					flex: 1,
					itemId: 'gridestoque',

					columns: {
						items: [
							/*{text: 'Código', dataIndex: 'id', width: 70},*/
							{text: 'Cod.',  dataIndex: 'id', width: 120},
							{text: 'Data', dataIndex: 'unixdata', xtype: 'datecolumn', width: 170, format: "d/m/Y H:i"},
							{text: 'Tipo', dataIndex: 'tipo', width: 200, renderer: function(value){
								if(value == "E") return "Entrada"; else return "Saida";
							}},
							{text: 'Fornecedor', dataIndex: 'fornecedor_nome', minWidth:100},
							{text: 'Descriçao', dataIndex: 'descricao', flex:1, autoSizeColumn:false},
							{text: 'Valor Total', dataIndex: 'valor_total', align:'right', minWidth: 110, width:100, renderer:function(value){
								return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Usuario', dataIndex: 'usuario_nome', width: 200}

							/*{text: 'Tipo Nota', editable:false, dataIndex: 'tiponota', flex: 1}*/
						],
					defaults: {
						autoSizeColumn: true
					}
				},
					viewConfig : {
				    	listeners : {
						    refresh : function (dataview) {
						      Ext.each(dataview.panel.columns, function (column) {
						       if (column.autoSizeColumn === true)
						        column.autoSize();
							  })
						    }
					    }
					}
				}
							
						/*,
					{
						
					,
				]*/
			]
		}

	]
})
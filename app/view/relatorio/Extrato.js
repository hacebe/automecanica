Ext.define('GestorFinanceiro.view.relatorio.Extrato', {
	extend: 'Ext.window.Window',
	alias: 'widget.formextrato',	

	requires:[
		'GestorFinanceiro.util.Util'
	],

	width: 800,
	height: 530,

	title: 'Extrato de Conta Corrente',
	autoShow: true,		
	layout: 'fit',
	
	constrainHeader: true,
	minimizable: true,
	maximizable: true,

	items:[
		{
			xtype:'container',
			//bodyPadding: '10px',
			
			layout: "border",						

			defaults:{
				//split: true,
				//collapsible: true
			},

			items:[				
				{
					region: 'north',
					xtype: 'form',
					itemId: 'formlancamentos',
					height: 120,
					bodyPadding: 10,
					scrollable: true,					
					defaults:{
						xtype: 'textfield',
						labelAlign: 'top',
						disabled: false,
						labelWidth: 130
					},
					items:[
						{
							xtype: 'combobox',
							store: 'Tesourarias',
							displayField: 'descricao' ,
							editable: false,
							allowBlank: false,
							valueField: 'id',
							width: 350,
							name: 'fonte',
							fieldLabel: 'Conta Corrente'
						},{
							xtype: 'container',
							layout: 'hbox',
							defaults:{
								xtype: 'textfield',
								allowBlank: false,	
								labelAlign: 'top',
								disabled: false,
								labelWidth: 130
							},
							items:[
								{
									fieldLabel: 'Mês',
									name: 'mes',
									width: 30
								},{
									fieldLabel: 'Ano',
									style: 'margin-left: 10px',
									name: 'ano',
									width: 40
								},{
									xtype: 'button',
									text: 'Confirmar',
									itemId: 'confirm',
									style: 'margin-top: 23px;margin-left: 10px'
								},{
									xtype: 'button',
									text: 'Exportar',
									itemId: 'export',
									style: 'margin-top: 23px;margin-left: 10px'
								}
							]
						},{
							xtype: 'label',
							text: 'Saldo Anterior: R$ 0,00',
							itemId: 'saldoLabel',
							style: 'position:absolute; right: 20px; bottom: 20px'
						}
					]		
					
				},{
					region: 'center',
					xtype: 'grid',
					sortableColumns: false,
					collapsible: false,
					store: Ext.create('GestorFinanceiro.store.Extratos'),
					columns: {
						items:[
							/*{text: 'Data', dataIndex: 'data', width: 90, renderer: function(value){
								return  value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4);
							}},*/
							{text: 'Data', dataIndex: 'unixdata', xtype: 'datecolumn',minWidth: 80, format: "d/m/Y"},
							{text: 'Historico', dataIndex: 'historico', flex:1, autoSizeColumn: false},
							{text: 'Entrada', dataIndex: 'entrada', align:'right', minWidth: 80, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Saida', dataIndex: 'saida', align:'right',minWidth: 80, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Saldo', dataIndex: 'saldo', align:'right',minWidth: 80, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}}
						],defaults: {
							autoSizeColumn: true
						}
					},viewConfig : {
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
			]
		}

	]
})

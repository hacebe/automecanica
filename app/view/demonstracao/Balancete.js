Ext.define('GestorFinanceiro.view.demonstracao.Balancete', {
	extend: 'Ext.window.Window',
	alias: 'widget.formbalancete',	

	requires:[
		'GestorFinanceiro.util.Util'
	],

	width: 990,
	height: 530,

	title: 'Balancete de Verificaçao',autoShow: true,
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
					layout: 'hbox',
					height: 80,
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
							store: 'Empresas',
							displayField: 'nome_fantasia' ,
							editable: false,
							allowBlank: false,
							valueField: 'id',
							width: 350,
							name: 'empresa',
							fieldLabel: 'Empresa'
						},{
							fieldLabel: 'Mes',
							style: 'margin-left: 10px',
							name: 'mes',
							width: 40
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
					region: 'center',
					xtype: 'grid',
					sortableColumns: false,
					collapsible: false,
					store: 'Balancete',
					columns: {
						items:[
							/*{text: 'Data', dataIndex: 'data', width: 90, renderer: function(value){
								return  value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4);
							}},*/
							{text: 'Classificação', dataIndex: 'mask', minWidth: 100, autoSizeColumn: true},
							{text: 'Descrição', dataIndex: 'plano', autoSizeColumn: true},
							{text: 'Saldo Anterior', dataIndex: 'saldoanterior', align:'right', minWidth: 100, renderer: numberRenderer},
							{text: 'Debito', dataIndex: 'debito', align:'right', minWidth: 80, renderer: numberRenderer},
							{text: 'Credito', dataIndex: 'credito', align:'right', minWidth: 80, renderer: numberRenderer},
							{text: 'Saldo Atual', dataIndex: 'saldoatual', align:'right',minWidth: 90, renderer: numberRenderer}
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
					    },
					    getRowClass: function(record, index, rowParams, ds){
					    	//console.log(ds);
					    	var tipo = record.get('tipo');
					    	rowParams = "";
					    	return (tipo == "T") ? 'y-grid3-bold-row' : 'y-grid3-normal-row';
					    }
					    
					}

					
				}
			]
		}

	]
})

function numberRenderer (value){
	if(value){
		return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
	}else{
		return "-";
	}
}
Ext.define('AutoMecanica.view.demonstracao.FluxoCaixa', {
	extend: 'Ext.window.Window',
	alias: 'widget.formfluxo',	

	requires:[
		'AutoMecanica.util.Util'
	],

	width: 990,
	height: 530,

	title: 'Fluxo de Caixa',
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
					store: 'FluxoCaixa',
					columns: {
						items:[
							/*{text: 'Data', dataIndex: 'data', width: 90, renderer: function(value){
								return  value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4);
							}},*/
							{text: 'Classificação', dataIndex: 'mask', minWidth: 100, autoSizeColumn: true},
							{text: 'Descrição', dataIndex: 'plano', autoSizeColumn: true},
							{text: 'Saldo', dataIndex: 'saldo', align:'right', minWidth: 80, renderer: numberRenderer},
							{text: 'Jan', dataIndex: 'jan', align:'right',minWidth: 45, renderer: numberRenderer},
							{text: 'Fev', dataIndex: 'fev', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Mar', dataIndex: 'mar', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Abr', dataIndex: 'abr', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Mai', dataIndex: 'mai', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Jun', dataIndex: 'jun', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Jul', dataIndex: 'jul', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Ago', dataIndex: 'ago', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Set', dataIndex: 'set', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Out', dataIndex: 'out', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Nov', dataIndex: 'nov', align:'right',minWidth: 45, renderer:numberRenderer},
							{text: 'Dez', dataIndex: 'dez', align:'right',minWidth: 45, renderer:numberRenderer}
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
		return AutoMecanica.util.Util.formatMoney(value, '2', ',', '.');
	}else{
		return "-";
	}
}
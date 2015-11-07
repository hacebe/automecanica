Ext.define('GestorFinanceiro.view.movimentacao.Notas', {
	extend: 'Ext.window.Window',
	alias: 'widget.listarnotas',

	config:{
		tipo: undefined,
	},

	width: 800,
	height: 530,

	title: 'Notas de Serviços',
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
				{					
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
				
				},
				{		
					collapsible: false,
					region: 'center',
					xtype: 'grid',
					store: 'Notas',										
					flex: 1,
					itemId: 'gridnotas',

					columns: {
						items: [
							/*{text: 'Código', dataIndex: 'id', width: 70},*/
							{text: 'N. Nota',  dataIndex: 'numeronota', width: 120},
							{
								menuDisabled: true,
								header: '<img class="header-icon" style="vertical-align:middle;" src="resources/images/icon-attachment.png"/>',
								dataIndex: 'anexos', width: 30, 
								renderer: function(value, meta, record, rowindx, colindx, store) {
								    
								    if (value != 0) {
								        meta.css = 'icon-attachment';
								    }else{
								        meta.css = '';
								    }
								    return '';
								}
							},
							{text: 'Emitido Em', dataIndex: 'unixdataemissao', xtype: 'datecolumn', width: 150, format: "d/m/Y"},
							{text: 'Favorecido', dataIndex: 'favorecido_nome', width: 200},
							{text: 'Valor da Nota', dataIndex: 'valornota', align:'right', minWidth: 110, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'PIS', dataIndex: 'pis', align:'right', width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'COFINS', dataIndex: 'cofins', align:'right', minWidth: 70, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'IRRF', dataIndex: 'ir', align:'right', minWidth: 60, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'CSLL', dataIndex: 'csll', align:'right', minWidth: 60, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'ISS', dataIndex: 'iss', align:'right', width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'INSS', dataIndex: 'inss', align:'right', minWidth: 60, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Valor Liquido', dataIndex: 'valorliquido', align:'right', minWidth: 100, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.'); 
							}},
							{text: 'Descontos', dataIndex: 'descontos', align:'right', minWidth: 90, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Adiantamentos', dataIndex: 'adiantamento', align:'right', minWidth: 110, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Juros', dataIndex: 'juros', align:'right', minWidth: 60, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Multa', dataIndex: 'multas', align:'right', minWidth: 60, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Recebido', dataIndex: 'total', align:'right', minWidth: 110, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}},
							{text: 'Saldo', dataIndex: 'saldo', align:'right', minWidth: 60, width:100, renderer:function(value){
								return GestorFinanceiro.util.Util.formatMoney(value, '2', ',', '.');
							}}
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
Ext.define('AutoMecanica.view.movimentacao.LancamentosFixos', {
	extend: 'Ext.window.Window',
	alias: 'widget.formlancamentosfixos',	

	requires:[
		'AutoMecanica.util.Util',
		'AutoMecanica.view.toolbar.SalvarEditarExcluirBuscaRevisado'
	],

	width: 800,
	height: 530,

	title: 'Lançamentos Fixos',
	autoShow: true,		
	layout: 'fit',
	
	constrainHeader: true,
	minimizable: true,
	maximizable: true,


	items:{

		xtype:'form',
			/*bodyPadding: '10px',*/
			
		layout: {
			type:'vbox',				
			align: 'stretch'
		},

		dockedItems: [
			{
				xtype:'salediexcbuscarevisado'
			}
		],
		items:[
			{
				xtype: 'grid',

				store: 'LancamentosFixos',

				style: 'background-color: #ffffff',

				plugins: new Ext.grid.plugin.CellEditing({
            		clicksToEdit: 1
        		}),
				
				selModel:{
					mode: 'MULTI'
				},

				columns:[
					{text: 'Sequência', dataIndex: 'sequencia', width: 100, align: 'center', editor: {allowBlank: false}},
					{text: 'Conta Débito', dataIndex: 'contadebito', width: 110, align: 'center', editor: {allowBlank: false}},
					{text: 'Conta Crédito', dataIndex: 'contacredito', width: 110, align: 'center', editor: {allowBlank: false}},
					{text: 'Descrição do Lançamento', dataIndex: 'descricao', flex: 2, editor: {allowBlank: false}},
					{text: 'Complemento', dataIndex: 'complemento', flex: 1, editor: {allowBlank: false}},
					{text: 'Valor', dataIndex: 'valor', width: 120, align: 'right', editor: new Ux.NumericField({hideTrigger: true,decimalSeparator: ',', fieldStyle:'text-align: right'}), renderer: function(val){ return AutoMecanica.util.Util.formatMoney(val, 2, ",", ".");  }},
					{text: 'Revisado', dataIndex: 'revisado', width: 100, align: 'center'}
				]
			}

		]
	}
})

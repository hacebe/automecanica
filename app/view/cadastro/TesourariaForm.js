Ext.define('GestorFinanceiro.view.cadastro.TesourariaForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formtesouraria',
	title: 'Incluir',

	width: 300,
	height: 250,

	layout: 'fit',
	modal: true,


	items:[
		{
			xtype: 'form',			
			bodyPadding: 10,
			defaults:{
				xtype: 'textfield',
				anchor: '100%'
			},
			items:[
				{xtype: 'hiddenfield', name: 'id'},
				{fieldLabel: 'Descrição', name: 'descricao', allowBlank: false},
				{fieldLabel: 'Conta', name: 'conta'},
				{fieldLabel: 'Saldo Inicial', name: 'saldoinicial', hideTrigger: true, decimalSeparator: ',', xtype: 'numericfield', fieldStyle:'text-align: right'},
				{fieldLabel: 'Sistema', name: 'sistema'},
				{fieldLabel: 'Contábil', name: 'contabil', allowBlank: false}
			],
	
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});
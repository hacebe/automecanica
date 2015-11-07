Ext.define('GestorFinanceiro.view.cadastro.UsuariosForm',{
	extend: 'Ext.window.Window',
	alias: 'widget.formusuarios',
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
				{fieldLabel: 'Nome', name: 'nome', allowBlank: false},
				{fieldLabel: 'E-Mail', name: 'email', allowBlank: false, vtype: 'email'},
				{fieldLabel: 'Usuário', name: 'usuario', allowBlank: false},
				{
					xtype: 'combobox', 
					editable:true, 
					fieldLabel: 'Tipo de Acesso',
					name: 'tipo',
					allowBlank: false,
					queryMode: 'local',
					displayField: 'text',
					valueField: 'tipo',
					itemId: 'comboTipo',
					store: Ext.create('Ext.data.Store',{
						
						storeId: 'tipoUsuarios',

						fields:['tipo', 'text'],

						data:[
							{tipo: '1', text: 'Super Usuário'},
							{tipo: '2', text: 'Funcionário'},
							{tipo: '3', text: 'Cliente'}
						]
					})
				},
				{fieldLabel: 'Ativo', name: 'ativo', xtype: 'checkbox', allowBlank: false, inputValue: '1'},

				{fieldLabel: 'Senha', name: 'senha', inputType: 'password'}

			],
	
			buttons:[				
				{text: 'Salvar', itemId: 'salvar'},
				{text: 'Cancelar', itemId: 'cancelar'}
			]
		}
	]
});
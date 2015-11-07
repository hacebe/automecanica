Ext.define('GestorFinanceiro.store.Usuarios',{
	extend: 'Ext.data.Store',

	model: 'GestorFinanceiro.model.Usuario',

	proxy:{
		type: 'ajax',
		url: 'data/usuario.php?module=getUsuarios',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
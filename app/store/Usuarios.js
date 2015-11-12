Ext.define('AutoMecanica.store.Usuarios',{
	extend: 'Ext.data.Store',

	model: 'AutoMecanica.model.Usuario',

	proxy:{
		type: 'ajax',
		url: 'data/usuario.php?module=getUsuarios',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
})
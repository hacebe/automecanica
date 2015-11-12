Ext.define('AutoMecanica.store.LancamentosFixos',{
	extend: 'Ext.data.Store',

	model: 'AutoMecanica.model.LancamentoFixo',

	proxy:{
		type: 'ajax',

		api: {
            create: 'data/lancamentofixo.php?module=salvar',
            read: 'data/lancamentofixo.php?module=getLancamentos',
            update: 'data/lancamentofixo.php?module=salvar',
            destroy: 'data/lancamentofixo.php?module=delete',
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            rootProperty: 'data'
        }


		/*url: 'data/lancamentofixo.php?module=getLancamentos',
		reader: {
			type: 'json',
			rootProperty: 'data'
		}*/
	}
 
})
Ext.define('GestorFinanceiro.singleton.Socket',{
	singleton: true,

	connection : {

		url : 'http://' + window.location.hostname + ':8887',
		exec: function () {
			if(this.instance) return this.instance;

			this.instance = io.connect(this.url);

			this.setListeners ();

			return this.instance;
		},

		setListeners : function () {
			if(!this.instance) return;
			var socket = this.instance;
			var code = this.code;

			socket.on("connected", function () {
				var cid = GestorFinanceiro.singleton.SharedData.company.id;
				if(GestorFinanceiro.singleton.SharedData.company.id) {
					socket.emit('joinRoom', cid);
				}
			})

			socket.on("onJoined", function (message) {
				console.log(message);
			})

			socket.on("onUpdateStore", function ( message ) {
				var store = Ext.StoreManager.lookup(message.name);
				if(!store) console.error('Store not found ' + message.name);

				//store.load();

				if ( message.selected ) {
					var win = Ext.ComponentQuery.query(message.selected.win)

					if(win.length) {
						win = win[0];

						var tree = win.down('treepanel');
						var selText = (tree.getSelectionModel().getSelection()[0]) ? tree.getSelectionModel().getSelection()[0].data.text : '';

						store.load({
							callback : function (r, o, p) {
								if( !selText ) return console.debug('not selected');

								var record = tree.getRootNode().findChild('text', selText, true);
								if( !record ) return console.error('child not found ' + selText);

								tree.setSelection(record);

								if ( selText == message.selected.item ) {
									tree.fireEvent('itemclick', tree);
								}

							}
						})
					}
				} else {

					store.load();
				}
			});
		}
	}

});
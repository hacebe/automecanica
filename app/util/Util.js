Ext.define('GestorFinanceiro.util.Util', {
	statics : { 

		decodeJSON : function (text) { 
			var result = Ext.JSON.decode(text, true);
			if (!result){
				result = {};
				result.success = false;
				result.msg = text;
			}
			return result;
		},

		showErrorMsg: function (text) { 
			Ext.Msg.show({
				title:'Erro!',
				msg: text,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		},

		msg: function (title, text) { 
			Ext.Msg.show({
				title: title,
				msg: text,				
				buttons: Ext.Msg.OK
			});
		},

		formatMoney: function(v, c, d, t){
			var n = v, 
			    c = isNaN(c = Math.abs(c)) ? 2 : c, 
			    d = d == undefined ? "." : d, 
			    t = t == undefined ? "," : t, 
			    s = n < 0 ? "-" : "", 
			    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
			    j = (j = i.length) > 3 ? j % 3 : 0;
			   return '' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");			
		},

		removeFormatMoney: function(v){
			var o = v,
				n = o;

				n = o.replace(/[.]/g, "");
				n = n.replace(/[,]/g, ".");

				return n;
		},

		showToast: function(msg, color){
			Ext.toast({
				html: msg, 
				frame: false,
				closable: false, 
				slideInDuration: 300,
				bodyStyle: (color) ? "color: " + color : '',
				align: 'tr'
			})
		},

		isValidDate: function(date) {
		    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
		    if (matches == null) return false;
		    var d = matches[1];
		    var m = matches[2] - 1;
		    var y = matches[3];
		    var composedDate = new Date(y, m, d);
		    return composedDate.getDate() == d &&
		            composedDate.getMonth() == m &&
		            composedDate.getFullYear() == y;
		},

		dac: function (pd, shortVersion){
			if(typeof pd !== "string") { pd += '' }
			if(/\D/.test(pd)) return false;

			var nd = new Date(),
				m = nd.getMonth() + 1,
				m = ((m+'').length < 10) ? '0' + m : m ,
				y = nd.getFullYear(),
				d = [];

			if( shortVersion ) {
				if(pd.length <= 2 && pd > 12 || pd == 0) {
					return false;
				}

				if (pd.length == 1) {
					pd = '0' + pd;
					d.push('01', pd, y);
				}
				
				else if(pd.length <= 3) {
					d.push('01', pd.substr(0,2), y);
				} else if(pd.length == 5) {
					pd = '0'+pd;
					d.push('01', pd.substr(0,2), pd.substr(2,4));
				} else if (pd.length == 6) {
					d.push('01', pd.substr(0,2), pd.substr(2,4));
				}

			} else {
				if(pd.length <= 2){
					if (pd.length < 2) {
						pd = '0' + pd;
					}

					d.push (pd, m, y);
				}else if(pd.length == 4){
					d.push(pd.substr(0,2), pd.substr(2), y);
				}else if(pd.length == 8){
					d.push(pd.substr(0,2), pd.substr(2,2), pd.substr(4));
				}
			}

			var	dd = d,
				date = d.join('/');

			if(this.isValidDate(date)){
				if(shortVersion) {
					d.shift();
					return d.join('-');
				}

				return date;
			}else{
				return false;
			}
		},

		PHP2JSDate: function (date) {
			return date.split('-').reverse().join('/');
		},

		JS2PHPDate: function (date) {
			return date.split('/').reverse().join('-');
		},

		humanFileSize: function(bytes, si) {
		    var thresh = si ? 1000 : 1024;
		    if(Math.abs(bytes) < thresh) {
		        return bytes + ' B';
		    }
		    var units = si
		        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
		        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
		    var u = -1;
		    do {
		        bytes /= thresh;
		        ++u;
		    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
		    return bytes.toFixed(1)+' '+units[u];
		},

		getTreeSelection: function (tree) {

			var sel = tree.getSelectionModel().getSelection()[0];
			return (sel) ? sel.data.text : '';
		}
	}
});

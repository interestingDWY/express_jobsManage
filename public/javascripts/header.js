define(["jquery"], function($){
	function Header(){
		this.load();
	}
	Header.prototype = {
		constructor: Header,
		load: function(){
			$.get("/html/header.html", $.proxy(this.headerHandler,this));
		},
		
		headerHandler: function(data){
			console.log(data)
			$("header").html(data);
		}
	}
	
	new Header();
	
});

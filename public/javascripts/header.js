
function Header(){
	this.init();
	
}
Header.NavTemplate = `<nav class="navbar navbar-inverse">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#">职位管理系统</a>
		    </div>
		
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		        <li class="active"><a href="/">首页 <span class="sr-only">(current)</span></a></li>
		        <li><a href="/html/position.html">职位管理</a></li>
		        
		      </ul>
		      
		      <ul class="nav navbar-nav navbar-right">
		        <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
		        <li data-toggle="modal" data-target="#registerModal"><a href="#">注册</a></li>
		      </ul>
		      <ul class="nav navbar-nav navbar-right login-success hidden">
		        <li><a href="#">欢迎:</a></li>
		        <li><a href="javascript:void(0);" class="logout">注销</a></li>
		      </ul>
		    </div>
		</nav>`;

$.extend(Header.prototype,{
	init(){
//		console.log("aaa")
		this.createDom();
		this.loadUser();
		this.addListener();
//		this.createModal();
	},
	createDom(){
		$("header").html(Header.NavTemplate);
	},
	loadUser(){
		const user = sessionStorage.username;
		if(user){
			$(".login-success").removeClass("hidden").prev("ul").remove();
			$(".login-success a:first").html("欢迎："+user);
		}else{
			this.createModal();
		}
	},
	createModal(){
		new LoginMadal();
		new RegisterModal();
	},
	addListener(){
		$(".logout").on("click",this.logoutHandler);
	},
	logoutHandler(){
		sessionStorage.removeItem("username");
		$.getJSON("http://rap2api.taobao.org/app/mock/115312/api/logout",(data)=>{
			if(data.res_body.status===1){
				location.reload();
			}
		});
	}
});

new Header();
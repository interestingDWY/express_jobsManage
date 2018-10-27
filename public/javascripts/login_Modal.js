function LoginMadal(){
	this.createDom();
	this.addListener();
	this.genCode();
}

LoginMadal.ModalTemplate=`<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">用户登录</h4>
		      </div>
		      <div class="modal-body">
		          <form class="form-login">
					  <div class="form-group">
					    <label for="loginuserName">用户名</label>
					    <input type="text" class="form-control" name="username" id="loginuserName" placeholder="请输入用户名">
					  </div>
					  <div class="form-group">
					    <label for="loginPassword">密码</label>
					    <input type="password" class="form-control" name="password" id="loginPassword" placeholder="请输入密码">
					  </div>
					  <div class="form-group">
					    <label for="loginCode">验证码</label>
					    <input type="text" class="form-control input-code" id="loginCode" placeholder="请输入验证码">
					    <div class="code"></div>
					  </div>
					  <div class="alert alert-danger hidden login-error">用户名或密码错误</div>
				  </form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary btn-login">登录</button>
		      </div>
		    </div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->`;

$.extend(LoginMadal.prototype,{
	createDom(){
		$("body").append(LoginMadal.ModalTemplate);
	},
	addListener(){
		$(".btn-login").on("click",this.loginHandler);
		$(".code").on("click",this.genCode);
		$(".input-code").on("blur",tnis.codeHandler);
	},
	loginHandler(){
		const data = $(".form-login").serialize();
		const url = "http://rap2api.taobao.org/app/mock/115312/api/job_jobsinfo";
		$.post(url,data,(data)=>{
			if(data.res_body.status===1){
//				$.cookie("username",data.res_body.data.username);
				sessionStorage.username=data.res_body.data.username;
				location.reload();
			}else{
				$(".login-error").removeClass("hidden");
			}
		},"json")
	},
	//生成验证码
	genCode(){
		$.getJSON("/api/captcha",(data)=>{
			$(".code").html(data.res_body.data);
		})
	},
	codeHandler(event){
		const code = $(event.target).val();
		$.getJSON("/api/svg_captcha/verify",{code},(data)=>{
			if(data.re_body.valid){
				alert("正确");
			}else{
				alert("错误");
			}
		})
		
	}
});


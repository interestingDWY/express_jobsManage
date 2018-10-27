function RegisterModal(){
	this.createDom();
	this.addListener();
}
RegisterModal.ModalTemplate=`<div class="modal fade" id="registerModal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">用户注册</h4>
		      </div>
		      <div class="modal-body">
		          <form class="form-register">
					  <div class="form-group">
					    <label for="registeruserName">用户名</label>
					    <input type="text" class="form-control" name="username" id="registeruserName" placeholder="请输入用户名">
					  </div>
					  <div class="form-group">
					    <label for="registerPassword">密码</label>
					    <input type="password" class="form-control" name="password" id="registerPassword" placeholder="请输入密码">
					  </div>
					  <div class="form-group">
					    <label for="registerConfirmPassword">确认密码</label>
					    <input type="password" class="form-control" id="registerConfirmPassword" placeholder="请确认密码">
					  </div>
					  <div class="form-group">
					    <label for="registerEmail">邮箱</label>
					    <input type="email" class="form-control" name="email" id="registerEmail" placeholder="请输入邮箱">
					  </div>
					  <div class="alert alert-danger register-error hidden">注册失败</div>
				  </form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary btn-register">注册</button>
		      </div>
		    </div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->`;

$.extend(RegisterModal.prototype ,{
	createDom(){
		$("body").append(RegisterModal.ModalTemplate);	
	},
	addListener(){
		$(".btn-register").on("click",this.registerHandler);
	},
	registerHandler(){
		const data = $(".form-register").serialize();
		const url = "http://rap2api.taobao.org/app/mock/115312/api/userregister";
		$.post(url,data,(data)=>{
			if(data.res_body.status===1){//注册成功即使用户登录成功
				sessionStorage.username = data.res_body.data.username;
				location.reload();
			}else{
				$(".register-error").removeClass("hidden");
			}
		},"json")
	}
	
});

//new RegisterModal();
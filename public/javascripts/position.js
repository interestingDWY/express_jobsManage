function jobModal(){

}


jobModal.ModalTemplate=`<tr>
<td>${job}</td>
<td><img src="../images/huba.jpg" /></td>
<td>dd</td>
<td>dd</td>
<td>dd</td>
<td>dd</td>
<td>dd</td>
<td>dd</td>
<td><a href="#" style="margin-right: 10px;">修改</a><a href="#">删除</a></td>
</tr>`;

$.extend(jobModal.prototype,{
    createDom(){
        $(".job").append(jobModal.ModalTemplate);
    }
});



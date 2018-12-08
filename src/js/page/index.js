require(["js/config.js"],function(){
	require(["mui","dom"],function(mui,dom){
		var pagenum = 0,
			pageLen = 4,
			total,
			count=0;
		mui.init({
			pullRefresh : {
				container:"#pullrefresh",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
				up : {
				  height:50,//可选.默认50.触发上拉加载拖动距离
				  auto:true,//可选,默认false.自动上拉加载一次
				  contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
				  contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				  callback :pullrefresh//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
				}
			  }
		});
		function pullrefresh(){
			getList()
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(pagenum++ ===total); 
		}
		function getList(){
			mui.ajax({
				url:"/api/list",
				data:{
					pagenum:pagenum*pageLen,
					pageLen:pageLen
				},
				type:"post",
				dataType:"json",
				success:function(res){
					total = res.count;
					if(res.code===1){
						render(res.data)
					}
				}
			})
		}
		function render(data){
			var baseUrl = "http://192.168.2.12:3000/images/"
			var str = ""
			data.forEach((item)=>{
				console.log(item)
				str+=`<li>
						<h3>
						<img src="${baseUrl}${item.img}" ></h3>
						<p>${item.title}</p>
						<p><b>${item.price}</b><s>${item.count}收藏</s></p>
					</li>`
			})
			dom(".wrap").innerHTML+=str
		}
	})
})
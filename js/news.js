$.getJSON(vhost+"/WeApi/News/index/type/count",function(res){
	$("span.n1 sm").html(res.count);
});
function json(s,p,l){
	  var meun = $(".list .meun span.cur").index();
	  $.getJSON(vhost+"/WeApi/News/index/page/"+p+"/limit/"+l+"?tmp="+timestamp(),function(res) {
		$(".new-list").html("");
		$(".no-list").show();
		$.each(res.data,function (i, data){
			if(data.xid==0){
				var w = 'w';
			}else{
				var w = '';
			}
			$(".new-list").append('<li data-id="'+data.id+'">'+
				    '<i class="'+w+' icon anticon icon-mail"></i>'+
				    '<div class="title">'+data.name+
				     ' <i class="anticon icon-ellipsis1"></i></div>'+
				    '<div class="neir">'+data.neir+'<p><i class="anticon icon-clockcircleo"></i> '+data.tjtime+'</p></div>'+
				  '</li>');
			i++;
			$(".no-list").hide();
		});
		var indexNewsListCur;
		$(".new-list li").on("click",function(){
			for(var i=0;i<$(".new-list li").length;i++){
				$(".new-list li").eq(i).removeClass('cur');
			}
			if(indexNewsListCur!=$(this).attr("data-id")){
				$.getJSON(vhost+"/WeApi/News/xidNewsOn/id/"+$(this).attr("data-id"),function(e){
				});
				$(this).addClass('cur');
				$(this).children('.icon').removeClass('w');
				indexNewsListCur = $(this).attr("data-id");
			}else{
				$(this).removeClass('cur');
				indexNewsListCur = null;
			}
		});
		$(".load-list").hide();
		$(".new-list").show();
	});
}
function jsonstas(s){
	$(".new-list").hide();
	$(".load-list").show();
	var meun = $(".list .meun span.cur").index();
	if (meun == 0) {
	    meun = 5;
	} else if (meun == 1) {
	    meun = 4;
	} else if (meun == 2) {
	    meun = 0;
	} else if (meun == 3) {
	    meun = 1;
	} else if (meun == 4) {
	    meun = 2;
	}
	var page = $(".page-list ul li.cur").html();
	if($(".page-list ul li.cur").length<1){
		page = 1;
	}
	if(s==1){
		shref('/meun/' + $(".list .meun span.cur").index()+ '/page/1');
	}else{
		shref('/meun/' + $(".list .meun span.cur").index() + '/page/' + page);
	}
	json(meun, page, 10);
}

		var locationHref = window.location.href;
		var t,p=10;
		function star(s){
			var meun = $(".list .meun span.cur").index();
			if (meun == 0) {
			    meun = 5;
			} else if (meun == 1) {
			    meun = 4;
			} else if (meun == 2) {
			    meun = 0;
			} else if (meun == 3) {
			    meun = 1;
			} else if (meun == 4) {
			    meun = 2;
			}
			$.getJSON(vhost+'/WeApi/News/index/type/count',function(res){
				c = res.count;
				t = res.page;
				pagehref = locationHref.match(/page\/(\S*)/);
				pageContall(t,p);
				if(pagehref!=null && s!=1){
					jumppage(pagehref[1]);
				}
				function jumppage(n){
					var length = $(".page-list ul li").length;
					if(n>p){
						var x = n-p;
						$(".page-list ul li").eq(p-1)[0].click();
						for(var i=0;i<x;i++){
							$(".page-x")[0].click();
						}
					}
					for(var i=0;i<length;i++){
						var now = $(".page-list ul li").eq(i).html();
						if(now==n){
							$(".page-list ul li").eq(i)[0].click();
							return;
						}
					}
				}
				jsonstas(s);
				function pageContall(t,p){
					var pagetallnum = t;
					var pagenum = p;
					if(pagetallnum<pagenum){
						pagenum = pagetallnum;
					}
					$(".page-list ul").html("");
					if(pagetallnum>1){
						$(".page-list ul").append('<span class="page-s"><i class="icon anticon icon-left"></i></span>');
						for(var i=0;i<pagenum;i++){
							if(i==0)
								$(".page-list ul").append('<li class="cur">'+(i+1)+'</li>');
							else
								$(".page-list ul").append('<li>'+(i+1)+'</li>');
						}
						$(".page-list ul").append('<span class="page-x"><i class="icon anticon icon-right"></i></span>');
					}
					$(".page-list ul li").click(function(){
						var length = $(this).parents("ul").children($("li")).length;
						for(var i=0;i<length;i++){
							$(this).parents("ul").children($("li").eq(i)).removeClass("cur");
						}
						$(this).addClass("cur");
						jsonstas();
					});
					$(".page-s").click(function(){
						var page = $(".page-list ul li.cur").index();
						var pageMum = $(".page-list ul li").eq(0).html(); 
						if (pagetallnum != pagenum & pageMum != 1) {
						    var length = $(".page-list ul li").length;
						    for (var i = 0; i < length; i++) {
						        var val = Number($(".page-list ul li").eq(i).text());
						        $(".page-list ul li").eq(i).text(val - 1);
						    }
							jsonstas();
						    return;
						}
						if(page > 1){
							var length = $(".page-list ul li").length;
							for(var i=0;i<length;i++){
								$(".page-list ul li").eq(i).removeClass("cur");
							}
							$(".page-list ul li").eq(page-2).addClass("cur");
							jsonstas();
						}else{
							smwarn('已经是第一页了');
						}
					});
					$(".page-x").click(function(){
						var page = $(".page-list ul li.cur").index();
						if(page < pagenum){
							var length = $(".page-list ul li").length;
							for(var i=0;i<length;i++){
								$(".page-list ul li").eq(i).removeClass("cur");
							}
							$(".page-list ul li").eq(page).addClass("cur");
							jsonstas(s);
						}else{
							var pageMum = $(".page-list ul li.cur").html();
							if(pagetallnum!=pagenum & pageMum < t){
								var length = $(".page-list ul li").length;
								for(var i=0;i<length;i++){
									var val = Number($(".page-list ul li").eq(i).text());
									$(".page-list ul li").eq(i).text(val+1);
								}
								jsonstas();
							}else{
								smwarn('已经是最后一页了');
							}
						}
					});
				}
			});
		}
		$(".list .meun span").click(function(){
			var length = $(this).parents(".meun").children($("span")).length;
			for(var i=0;i<length;i++){
				$(this).parents(".meun").children($("span")[i]).removeClass("cur");
			}
			$(this).addClass("cur");
			if(meunhref!=null){
				if(meunhref[1]!=$(".list .meun span.cur").index()){
					star(1);
					return;
				}
			}
			star();
		});
		meunhref = locationHref.match(/meun\/(\S*)\/page/);
		if(meunhref!=null){
			$(".list .meun span").eq(meunhref[1])[0].click();
		}else{
			star();
		}

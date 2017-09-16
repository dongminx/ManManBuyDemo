$(function() {
    var categoryid = GetQueryString("categoryid");
    var pageid = GetQueryString("pageid")
    getTitle(categoryid);
    getList(categoryid, pageid);
})

function getTitle(categoryid) {
    $.ajax({
        type: 'get',
        url: 'http://182.254.146.100:3000/api/getcategorybyid?categoryid=' + categoryid,
        success: function(data) {
            // console.log(data)
            // console.log(data.result[0].category);
            $(".active").html(data.result[0].category);
        }
    })
}
//该方法是调用地址栏中的参数  
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getList(categoryid, pageid) {
    var pageid = parseInt(pageid);
    $.ajax({
        type: 'get',
        url: "http://182.254.146.100:3000/api/getproductlist",
        data: {
            categoryid: categoryid,
            pageid: pageid
        },
        success: function(info) {
            var List = Handlebars.compile($("#productList").html());
            $(".productList ul").html(List(info));
            // console.log(info);
            var pagesize = info.pagesize;
            var total = info.totalCount;
            var pages = Math.ceil(total / pagesize);
            // console.log(pages);
            var option = "";
            for (var i = 0; i < pages; i++) {
                if ((i + 1) == pageid) {
                    option += "<option selected value=" + (i + 1) + ">第" + (i + 1) + "页</option>"
                } else {
                    option += "<option value=" + (i + 1) + ">第" + (i + 1) + "页</option>"
                }
            }
            $("select").html(option);
            //实现点击option页数跳转
            $("select").on("change", function() {
                    // console.log($(this).val());
                    window.location.href = "./product.html?categoryid=" + categoryid + "&pageid=" + $(this).val();
                })
                //实现点击上一页或下一页跳转
                //上一页 pageid-1
                //下一页 pageid+1
            var lasturl = "./product.html?categoryid=" + categoryid + "&pageid=" + (pageid - 1);
            var nexturl = "./product.html?categoryid=" + categoryid + "&pageid=" + (pageid + 1);
            if (pageid <= 1) {
                var lasturl = "./product.html?categoryid=" + categoryid + "&pageid=1"
            }
            if (pageid >= pages) {
                var nexturl = "./product.html?categoryid=" + categoryid + "&pageid=" + pages;
            }
            $(".last").attr("href", lasturl);
            $(".next").attr("href", nexturl)
        }
    })
}
$(function() {
    $.ajax({
        type: 'get',
        url: 'http://182.254.146.100:3000/api/getcategorytitle',
        data: null,
        success: function(data) {
            var resultTitle = Handlebars.compile($("#categoryTitle").html());
            $(".category-ul").html(resultTitle(data));
        }
    })
    $(".category-ul").on("click", "li a", function() {
        $(this).parent().find("ul").toggle();
        $(this).parent().siblings().find("ul").hide();
        var $title = $(this).attr("data-list-id");
        var $that = $(this);
        console.log($title);
        getcategroyList($title, $that);
    })
})

function getcategroyList($title, $that) {
    $.ajax({
        type: 'get',
        url: 'http://182.254.146.100:3000/api/getcategory',
        data: {
            titleid: $title,
        },
        success: function(info) {
            // 1  数据处理完成
            // console.log(info);
            // 2  定义模板
            // 3  绑定数据            
            var categoryList = Handlebars.compile($("#categoryList").html());
            // 4  渲染            
            var $ul = $that.siblings("ul");
            $ul.html(categoryList(info));
        }
    })
}
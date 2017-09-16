function getData() {
    $.ajax({
        type: 'get',
        url: 'http://182.254.146.100:3000/api/getindexmenu',
        data: null,
        success: function(data) {
            // console.log(data);
            var html = template('menu-temp', data);
            $(".row").html(html);
            var $btn = $('.row div:nth-child(8)');
            $btn.click(function() {
                $('.row div:nth-last-child(-n+4)').slideToggle();
                return false;
            })
        }
    })

}
getData();

function getCount() {
    $.ajax({
        type: 'get',
        url: 'http://182.254.146.100:3000/api/getmoneyctrl',
        data: null,
        success: function(info) {
            // console.log(info);
            var productTime = template("count-temp", info);
            $(".discount-list").html(productTime);
        }
    })
}
getCount();
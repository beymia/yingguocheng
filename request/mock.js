const Mock = require('mock')
/*
* 模拟API请求，待测试
* */
Mock.mock('/orderForm', 'get', {
    "code": 1000,
    "msg": "success",
    "data": [
        {
            "id": "16011920336646810",
            "goods_data": [
                {
                    "id": "15996445868596547",
                    "goods_name": "多肉瓜瓜冻",
                    "goods_price": "15.00",
                    "home_avatar": "http://host.dot_img.com/uploads/202009/10/159970097881117.jpg",
                    "norm": "正常,标准甜",
                    "goods_num": "1"
                },
                {
                    "id": "15996445868165929",
                    "goods_name": "多肉葡萄冰棒",
                    "goods_price": "15.00",
                    "home_avatar": "http://host.dot_img.com/uploads/202009/10/159970097881117.jpg",
                    "norm": "正常,不另外加糖",
                    "goods_num": "1"
                }
            ],
            "pay_status": "待支付",
            "shop_id": "15989536458951854",
            "shop_name": "合肥正大广场店",
            "created_at": "2020/09/27 15:33",
            "payment_info": 30.5,
            "haul_method": "外卖",
            "invoice_status": "2"
        }
    ]
})
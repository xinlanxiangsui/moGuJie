// 为什么不能用import导入？
let Mock = require('mockjs')
var Random = Mock.Random;
Mock.mock('goods', {
  goods: [{
    'pop|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2859560203,2432579858&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'new|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=924457718,1182053941&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'sell|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2189043624,3712399961&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }]

  }, {
    'pop|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4150529858,806230054&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'new|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3525599812,2499981515&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'sell|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2930239747,2629170608&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }]

  }, {
    'pop|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1980119119,1973290854&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'new|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1397277451,1804891645&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'sell|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=76066795,1665100140&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }]

  }, {
    'pop|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=160158177,2480351431&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'new|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=418120235,45112912&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'sell|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1435005399,2678229852&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }]

  }, {
    'pop|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1565123031,3622518651&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'new|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1127211898,490710726&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }],
    'sell|10': [{
      'id|+1': '@natural(1,10000)',
      imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3785272366,3908246326&fm=26&gp=0.jpg',
      title: '@first',
      price: '@natural(50,100)'
    }]

  }, ]
})

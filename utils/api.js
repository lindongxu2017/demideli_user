const api = {
  admin: {
    login: '/index.php/api/login/wxxcxlogin',
    register: '/index.php/api/login/userRegister',
    auth: '/index.php/api/login/userCompanyAuth'
  },
  user: {
    info: '/index.php/api/user/getUserInfo',
    companyList: '/index.php/api/user/userCompanyList',
    modify: '/index.php/api/user/modifyMobile',
    QRcode: '/index.php/api/user/wxGetAcode',
    setDown: '/index.php/api/user/setUserDown',
    suggest: '/index.php/api/user/sendSuggest',
    accountLog: '/index.php/api/user/userCostLogList'
  },
  common: {
    getMobileCode: '/index.php/api/login/GetMobileCode',
    uploadIMG: '/index.php/api/upload/NormalUploadImg'
  },
  home: {
    typeList: '/index.php/api/product/getCategory',
    itemList: '/index.php/api/product/getProductList',
    itemDetail: '/index.php/api/product/productInfo',
    comment: '/index.php/api/product/getProductDp',
    collect: '/index.php/api/product/collect'
  },
  order: {
    list: '/index.php/api/order/getOrderList',
    detail: '/index.php/api/order/getOrderDetail',
    comment: '/index.php/api/order/addComment',
    creat: '/index.php/api/payment/makeOrder',
    detail: '/index.php/api/order/getOrderDetail'
  }
}

module.exports = {
  api: api
}
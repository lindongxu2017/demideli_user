const api = {
  admin: {
    login: '/customerapi/login/wxxcxLogin',
    auth: '/customerapi/login/customerAuth'
  },
  user: {
    info: '/customerapi/customer/index',
    monthYj: '/customerapi/customer/monthJx',
    totalYj: '/customerapi/customer/totalJx',
    modify: '/customerapi/customer/updateName'
  },
  common: {
    getMobileCode: '/api/login/GetMobileCode',
    uploadIMG: '/api/upload/NormalUploadImg'
  },
  home: {
    typeList: '/api/product/getCategory',
    itemList: '/api/product/getProductList',
    itemDetail: '/api/product/productInfo',
    comment: '/api/product/getProductDp',
    collect: '/api/product/collect'
  },
  order: {
    list: '/customerapi/customer/order',
    detail: '/customerapi/customer/orderInfo',
    change: '/customerapi/customer/utPrice',
    cooperation: '/customerapi/customer/sureComfirm'
  }
}

module.exports = {
  api: api
}
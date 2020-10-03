

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: req => {
      return {
        code: 20000,
        data: {
          title: 'This is a test article'
        }
      }
    }
  }
]


module.exports = [
  {
    url: '/vue-admin/article/list',
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
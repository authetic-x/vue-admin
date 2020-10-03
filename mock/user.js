const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

module.exports = [
  // login
  {
    url: '/vue-template-admin/user/login',
    type: 'post',
    response: req => {
      const { username } = req.body
      const token = tokens[username]

      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token,
      }
    }
  }
]
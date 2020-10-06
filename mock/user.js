const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'   
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // login
  {
    url: '/vue-admin/user/login',
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
  },
  // getInfo
  {
    url: '/vue-admin/user/info\.*',
    type: 'get',
    response: req => {
      const { token } = req.query
      const info = users[token]
      
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }
      return {
        code: 20000,
        data: info
      }
    }
  },
  {
    url: '/vue-admin/user/logout',
    type: 'post',
    response: _ => ({
      code: 20000,
      data: 'success'
    })
  }
]
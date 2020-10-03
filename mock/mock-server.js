const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const path = require('path')
const chalk = require('chalk')
const Mock = require('mockjs')

const mockDir = path.join(process.cwd(), 'mock')

function processMock(url, type, response) {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('Request invoked: ', req.path)
      res.json(Mock.mock(response instanceof Function ? response(req, res) : response))
    }
  }
}

function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index')

  const mockForServer = mocks.map(mock => {
    return processMock(mock.url, mock.type, mock.response)
  })
  for(const mock of mockForServer) {
    // console.log(mock.url, mock.response)
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = mockForServer.length
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function clearCache() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = app => {
  // application/json
  app.use(bodyParser.json())
  // application/x-www-formd-urlencoded
  app.use(bodyParser.urlencoded({
    // ??
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  let mockStartIndex = mockRoutes.mockStartIndex
  let mockRoutesLength = mockRoutes.mockRoutesLength

  // hot module replacement
  chokidar.watch('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        app._router.stack.splice(mockStartIndex, mockRoutesLength)
        clearCache()

        const mockRoutes = registerRoutes(app)
        mockStartIndex = mockRoutes.mockStartIndex
        mockRoutesLength = mockRoutes.mockRoutesLength

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
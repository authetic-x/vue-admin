const user = require('./user')
const articles = require('./article')

const mocks = [
  ...user,
  ...articles,
]

module.exports = {
  mocks,
}
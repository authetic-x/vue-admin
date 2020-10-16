export default {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedView: state => state.tagsView.visitedView,
  cachedView: state => state.tagsView.cachedView,
  permission_routes: state => state.permission.routes,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  introduction: state => state.user.introduction,
  token: state => state.user.token
}
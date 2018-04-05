/*
export const someMutation = (state) => {
}
*/

export const loading = (state, loading) => {
  // 加入计数器
  if (loading) {
    state.loading_count += 1
    state.loading = true
  } else state.loading_count -= 1

  if (state.loading_count < 1) {
    state.loading_count = 0
    state.loading = false
  }
}
export const SET_OAUTH_INFO = (state, oauth_info) => {
  state.oauth_info = oauth_info
}

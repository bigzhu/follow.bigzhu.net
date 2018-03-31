function load(component) {
  // '@' is aliased to src/components
  return () =>
    import(`@/${component}.vue`)
}

export default function() {
  let names = [
      'BzRouteTab',
      'TimeLen',
      'Oauth',
      'LinkBtn',
      'QTooltip',
      'QFabAction',
      'BzFab',
      'Login',
      'BzUploadFileMultiple',
      'BzUploadImgMultiple',
      'BzUploadImg',
      'BzUploadFile',
      'BzTitle'
  ]
  let components = {}
  for (var name of names) {
    components[name] = load(name)
  }
  return components
}

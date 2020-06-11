const pathname = window.location.pathname
const search = window.location.search

function submitCheck() {
  return window.confirm('Do you really want to send these record ?')
}

function deleteCheck() {
  return window.confirm('Do you really want to delete this record ?')
}


const pathname = window.location.pathname
const search = window.location.search

function submitCheck() {
  const num = document.querySelectorAll('.expense-formate-check')
  // expense format check
  let formateCheck = ''
  const regex = /\d/g
  num.forEach(n => {
    if (!regex.test(n.value)) {
      alert('Cost is not a number, please check again')
      formateCheck = false
      return window.event.preventDefault()
    } else formateCheck = true
  })

  if (formateCheck) {
    return window.confirm('Do you really want to send these record ?')
  }
}

function deleteCheck() {
  return window.confirm('Do you really want to delete this record ?')
}
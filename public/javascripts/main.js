// index page number formate
(function () {
  const amounts = document.querySelectorAll('.expense-amount')
  amounts.forEach(amount => {
    amount.innerText = formateNum(amount.textContent)
  })
})()

// create, edit page number formate check
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

// index page delete check
function deleteCheck() {
  return window.confirm('Do you really want to delete this record ?')
}

// formate number with comma
function formateNum(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
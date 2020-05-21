const pathname = window.location.pathname
const search = window.location.search

filterSelected()
sortSelected()

function submitCheck() {
  return window.confirm('Do you really want to send these record ?')
}

function deleteCheck() {
  return window.confirm('Do you really want to delete this record ?')
}


function filterSelected() {
  const house = document.querySelector('.filter-house')
  const transport = document.querySelector('.filter-transport')
  const entertainment = document.querySelector('.filter-entertainment')
  const food = document.querySelector('.filter-food')
  const others = document.querySelector('.filter-others')

  if (pathname.includes('/filter') && search.includes('?category=house')) {
    house.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/filter') && search.includes('?category=transport')) {
    transport.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/filter') && search.includes('?category=entertainment')) {
    entertainment.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/filter') && search.includes('?category=food')) {
    food.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/filter') && search.includes('?category=others')) {
    others.setAttribute('selected', 'selected')
  }
}

function sortSelected() {
  const amountDesc = document.querySelector('.sort-amount-desc')
  const amountAsc = document.querySelector('.sort-amount-asc')
  const dateDesc = document.querySelector('.sort-date-desc')
  const dateAsc = document.querySelector('.sort-date-asc')

  if (pathname.includes('/sort') && search.includes('?name=amount&way=desc')) {
    amountDesc.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/sort') && search.includes('?name=amount&way=asc')) {
    amountAsc.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/sort') && search.includes('?name=date&way=desc')) {
    dateDesc.setAttribute('selected', 'selected')
  }

  if (pathname.includes('/sort') && search.includes('?name=date&way=asc')) {
    dateAsc.setAttribute('selected', 'selected')
  }
}
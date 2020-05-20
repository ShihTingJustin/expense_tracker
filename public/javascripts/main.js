

function submitCheck() {
  return window.confirm('Do you really want to send these record ?')
}

function deleteCheck() {
  return window.confirm('Do you really want to delete this record ?')
}

const selector = document.querySelector('.category-selector')
const title = document.querySelector('.filter-title')
const house = document.querySelector('.filter-house')
const transport = document.querySelector('.filter-transport')
const entertainment = document.querySelector('.filter-entertainment')
const food = document.querySelector('.filter-food')
const others = document.querySelector('.filter-others')

const pathname = window.location.pathname
if (pathname.includes('/filter=house')) {
  selector.insertBefore(house, selector.firstChild)
  title.remove()
}

if (pathname.includes('/filter=transport')) {
  selector.insertBefore(transport, selector.firstChild)
  title.remove()
}

if (pathname.includes('/filter=entertainment')) {
  selector.insertBefore(entertainment, selector.firstChild)
  title.remove()
}

if (pathname.includes('/filter=food')) {
  selector.insertBefore(food, selector.firstChild)
  title.remove()
}

if (pathname.includes('/filter=others')) {
  selector.insertBefore(others, selector.firstChild)
  title.remove()
}
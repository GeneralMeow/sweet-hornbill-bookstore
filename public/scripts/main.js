// TODO: If user clicks edit on a second book before finishing edit on first, state it lost
// Do we have multiple states for each book? force close the previous one?
// Perhaps just move line 11 into an if statement and put it into the edit handler.
// OR we don't have to keep track of it at all! let's just rebuild it when you finish editing.

// Perhaps the edit function should have two completely independant branches of logic, one for
// if edit mode is on, and one for if edit mode is off, then just create the dom elements each time

const state = {
  editmode: false,
  title: undefined
}

document.addEventListener("DOMContentLoaded", event => {
  state.title = document.querySelector('#title'+bookNumber)
})

function edit(bookNumber, numOfBooks) {
  state.editmode = !state.editmode
  let titleInput = document.querySelector('#titleInput'+bookNumber)
  if(!titleInput){
    titleInput = document.createElement('input')
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('placeholder', 'Title')
    titleInput.setAttribute('value', state.title.textContent)
    titleInput.setAttribute('id', 'titleInput'+bookNumber)
  }
  if(state.editmode) {
    state.title.parentNode.replaceChild(titleInput, state.title)
  } else {
    titleInput.parentNode.replaceChild(state.title, titleInput)
  }
}

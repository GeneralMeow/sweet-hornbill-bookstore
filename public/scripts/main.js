const fields = ['title', 'author', 'genre', 'description']

function setAttributes(element, attributes){
  for( let attribute in attributes ){
    element.setAttribute(attribute, attributes[attribute])
  }
}

function update(data) {
  return fetch('/api/update', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

function replaceWithInput(type, index) {
  let element = document.querySelector('#'+type+index)
  if( element ){  // Normal mode to edit mode
    if( type !== 'description' ) {  // input text
      let text = element.textContent
      elementInput = document.createElement('input')
      setAttributes(elementInput, {
        'type': 'text',
        'placeholder': type,
        'value': text,
        'id': type+'Input'+index,
        'onkeyup': 'inputKeyUp(event, '+index+')'
      })
      element.parentNode.replaceChild(elementInput, element)
    } else {  // input textarea
      let text = element.textContent
      elementInput = document.createElement('textarea')
      setAttributes(elementInput, {
        'cols': 60,
        'rows': 8,
        'placeholder': type,
        'id': type+'Input'+index,
        'onkeyup': 'inputKeyUp(event, '+index+')'
      })
      elementInput.textContent = text
      element.parentNode.replaceChild(elementInput, element)
    }
    return false
  } else { // Edit mode to normal mode
    let elementInput = document.querySelector('#'+type+'Input'+index)
    let text = elementInput.value
    element = document.createElement('li')
    element.setAttribute('id', type+index)
    element.textContent = text
    elementInput.parentNode.replaceChild(element, elementInput)
    return true
  }
}

function edit(bookNumber) {
  const data = {id: bookNumber}
  for(let field of fields){
    updateData = replaceWithInput(field, bookNumber)
    if( updateData ) {
      const inputField = document.querySelector('#'+field+bookNumber)
      if( inputField.tagName === 'INPUT') {
        data[field] = inputField.value
      } else {
        data[field] = inputField.textContent
      }
    }
  }

  if( updateData ) {
    update(data)
      .then( returnVal => {
        console.log("Done updating. ", returnVal)
      })
  }
}

function inputKeyUp(event, bookNumber) {
  if(event.code === "Enter"){
    edit(bookNumber)
  }
}

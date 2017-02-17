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

function replaceWithInputTags(type, index) {
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

function validateFields(bookNumber){
  for(let field of fields){
    const domField = document.querySelector('#'+field+bookNumber) || document.querySelector('#'+field+'Input'+bookNumber)

    let exitCode
    if(field){
      if(field.value){
        exitCode = !(field.value.length > 0)
      } else if(field.textContent){
        exitCode = !(field.textContent.length > 0)
      } else {
        exitCode = true
      }
    } else {
      throw new Error("Big error here. Burn your laptop and bury it in nuclear radiation to keep safe.")
    }

    if(exitCode) {
      domField.style.border = '2px solid red'
      return false
    } else {
      domField.style = ''
    }

  }
}

function edit(bookNumber) {
  const data = {id: bookNumber}
  let exitCode = validateFields(bookNumber)
  if(exitCode) return false

  for(let field of fields){
    const domField = document.querySelector('#'+field+bookNumber) || document.querySelector('#'+field+'Input'+bookNumber)

    updateData = replaceWithInputTags(field, bookNumber)
    if( updateData ) {
      if( domField.tagName === 'INPUT') {
        data[field] = domField.value
      } else {
        data[field] = domField.textContent
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

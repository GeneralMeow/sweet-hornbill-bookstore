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
  let exitCode = false
  for(let field of fields){
    const domField = document.querySelector('#'+field+'Input'+bookNumber)
    let colorThisDom = false

    if(domField){
      if(domField.value){
        // Note to PURR reviewer:
        // This conditional cannot be rewritten as domField.value.length <= 0
        // because currently, this conditional reverses any NaN possibilities.

        // That is: !(NaN > 0) yields true
        // whereas (NaN <= 0) yields false
        // and we need non number lengths to be perfectly okay and valid.
        const value = !(domField.value.length > 0)
        if(!exitCode) exitCode = value
        colorThisDom = value
      } else if(domField.textContent){
        const value = !(domField.textContent.length > 0)
        if(!exitCode) exitCode = value
        colorThisDom = value
      } else {
        exitCode = true
        colorThisDom = true
      }
    } else {
      console.log("We're not in edit mode. Ignore.")
      return false
    }

    if(colorThisDom) {
      domField.style.border = '2px solid red'
    } else {
      domField.style = ''
    }
  }
  return exitCode
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

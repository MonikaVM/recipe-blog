// dropdown menu
const dropdownButton = document.getElementById('dropdown-button')
const nav = document.querySelector('.navs')

dropdownButton.addEventListener('click', () => {
    nav.classList.toggle('toggleShow')
}) 

// ingredients
const list = document.getElementById('ingredient-list')
const input = document.querySelector('#ingredient-input')
const button = document.querySelector('#add-button')
const container = document.querySelector('.input-container')

button.addEventListener('click', () => {
    list.setAttribute('class', '')
    list.insertAdjacentHTML('beforeend', 
    `<input class="ingredients" type="text" name="ingredients" value="${input.value}"></input>`
    )
    input.value = ""
    input.focus()
})

list.addEventListener('click', e => {
    if (e.target.tagName == 'INPUT') {
        e.target.remove()
    }
    if (list.children.length <= 0) {
        list.setAttribute('class', 'hidden')
    }
})


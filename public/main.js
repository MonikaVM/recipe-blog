const list      = document.getElementById('list')
const input     = document.querySelector('#ingredient')
const button    = document.querySelector('#add')
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
const formEl = document.querySelector('form')
const descEl = document.querySelector('#desc')
const priceEl = document.querySelector('#price')
const siteEl = document.querySelector('#site')
const leadListEl = document.querySelector('#leadList')

let leads = []

formEl.addEventListener('submit', e => {
    e.preventDefault()
    const desc = descEl.value
    const price = priceEl.value
    const site = siteEl.value
    const lead = `${desc}|${price}|${site}`
    leads.push(lead)
    render(leads)
    formEl.reset()
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        let [descStr, priceStr, site] = leads[i].split("|");
        listItems += `
            <li data-index="${i}">
                <p>
                    <a target='_blank' href='${site}'>
                        ${descStr}
                    </a>
                    $${priceStr}
                    <button class="deleteBtn"><img src='cancel.png' border='0' /></button>
                </p>
            </li>
        `
    }
    ulEl.innerHTML = listItems

    const deleteBtns = Array.from(document.querySelectorAll('.deleteBtn'))
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const li = e.target.closest('li')
            const index = li.getAttribute('data-index')
            leads.splice(index, 1)
            render(leads)
        })
    })
}

leads = [
    "Product 1|100|https://www.example.com/product1",
    "Product 2|200|https://www.example.com/product2",
    "Product 3|300|https://www.example.com/product3",
]

const ulEl = document.querySelector('ul')
render(leads)


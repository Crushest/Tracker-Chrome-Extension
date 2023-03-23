const desc = document.getElementById("desc")
const price = document.getElementById("price")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const inputEl = document.getElementById("input")

let myLeads = []

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

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
                <button id='cancel' class='deleteItem'> <img src='cancel.png' border='0' /></button>
                </p>
            </li>
        `
    }
    ulEl.innerHTML = listItems

    const deleteBtns = Array.from(document.querySelectorAll('.deleteItem'))
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const li = e.target.closest('li')
            const index = li.getAttribute('data-index')
            leads.splice(index, 1)
            render(leads)
            localStorage.setItem("myLeads", JSON.stringify(leads))
        })
    })
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let site = tabs[0].value
        let descStr = desc.value
        let priceStr = price.value
        myLeads.push(`${descStr}|${priceStr}|${site}` )
        desc.value = ""
        price.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        inputEl.reset()
    }) 
})
let myLeads = []
const desc = document.getElementById("desc")
const price = document.getElementById("price")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        let [descStr, priceStr, site] = leads[i].split("|");
        listItems += `
            <li>
                <p>
                <a target='_blank' href='${site}'>
                ${descStr}
                </a>
                $${priceStr}
                <button id="cancel" onclick='deleteItem(${i})'><img src='cancel.png' border='0' /></button>
                </p>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

function deleteItem(index) {
    myLeads.splice(index, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let site = tabs[0].url
        let descStr = desc.value
        let priceStr = price.value
        myLeads.push(`${descStr}|${priceStr}|${site}` )
        desc.value = ""
        price.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }) 
})
let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
const leads = JSON.parse(localStorage.getItem('myLeads'))

if (leads) {
  myLeads = leads
  render(myLeads)
}

const tabs = chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  const currentTab = tabs[0].url;
  console.log("Current tab information:", currentTab);
});

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
  })
})


deleteBtn.addEventListener('dblclick', (e) => {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener('click', (e) => {
  myLeads.push(inputEl.value)
  inputEl.value = ''

  localStorage.setItem('myLeads', JSON.stringify(myLeads))

  render(myLeads)
})

function render(arr) {
  const listItems = arr.map((item) => `<li><a href="https://${item}" target="_blank">${item}</a></li>`).join('')
  ulEl.innerHTML = listItems
}

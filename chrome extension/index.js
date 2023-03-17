
let myLinks = []
// localStorage.clear()
const link = document.getElementById("link")                // UL
const inputLink = document.getElementById("input-el")       //input
const inputBtn = document.getElementById("input-btn")       //button
let deleBtn = document.getElementById("del-btn")
let saveTab = document.getElementById("saveTab")


deleBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  myLinks = []
  renderLinks()
})

saveTab.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLinks.push(tabs[0].url.split("/")[2])
      localStorage.setItem("myLinks" , JSON.stringify(myLinks))
      renderLinks()
  })
})

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
if(leadsFromLocalStorage) {
  myLinks = leadsFromLocalStorage
  renderLinks()
}
console.log(leadsFromLocalStorage)
console.log(myLinks)
inputBtn.addEventListener("click", function() {
  renderLinks()
  localStorage.setItem("myLinks" , JSON.stringify(myLinks))
})

inputLink.addEventListener ("keypress", function() {
  
  if (event.key === "Enter") {
    renderLinks() 
    localStorage.setItem("myLinks" , JSON.stringify(myLinks))
  }
})

// action when button press
function renderLinks(){
  myLinks.push(inputLink.value)
  inputLink.value = ""
  let listItem = ""
  for(i = 0 ; i < myLinks.length ; i++){
    listItem += 
    `<li>
      <a target="_blank" href="${myLinks[i]}" >
        ${myLinks[i]}
      </a>
    </li>`
  }
  link.innerHTML = listItem
}




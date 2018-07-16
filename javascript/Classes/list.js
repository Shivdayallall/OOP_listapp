class List {
    constructor() {
        this.itemArr = localStorage.getItem('items')? JSON.parse(localStorage.getItem('items')).items : []
        this.ul = document.querySelector("#unorderList")
        this.textInput = document.querySelector("#inputText")
        this.textInput.addEventListener("keypress", this.addListItem.bind(this))
        this.makeList()
    }
     addListItem() {
         if(event.keyCode === 13 && event.target.value) {
             this.itemArr.push(event.target.value)
             event.target.value = ''
             this.makeList()
         } // end if
     } // end addlistitem()
     makeList() {
         this.updateLocalStorage()
         this.ul.innerHTML = ''
         let storedArray = JSON.parse(localStorage.getItem('items')).items
         storedArray.forEach((item, index) => {
             this.li = document.createElement("li")
             this.li.addEventListener("click", this.crossOut.bind(this))
             // Icon documentation
             let icon = document.createElement('i')
             icon.addEventListener('click', this.removeItem.bind(this))
             icon.className = 'fa fa-trash-alt'
             icon.dataset.key = index
             this.li.appendChild(icon)
             this.li.innerHTML += item
             this.ul.appendChild(this.li)
         }) // end foreach
     } // end makelist()
     crossOut() {
         if(!event.target.dataset.key) {
             event.target.classList.toggle('done')
         } else {
             this.removeItem(event)
         }
     }
     removeItem(event) {
         console.log(event.target.dataset)
         const itemIndex = event.target.dataset.key
         console.log(this.itemArr)
         this.itemArr.splice(itemIndex, 1)
         console.log(this.itemArr)
         this.makeList()
     }
     updateLocalStorage() {
         localStorage.setItem('items', JSON.stringify({ items: this.itemArr }))
     }
} // end class

(function() {
    const list = new List('task')
})()
export default class  CardView {

    constructor() {
    
        
    }

    renderCardContainerHTML(title) {
        return `<div class="card_container">
                    <h1 class="card_container_title">${title}</h1>
                    <div class="card_container_content">
                    </div>
                    <div   class="card_container_add">+Add another card</div>
                </div>`
    }
    renderCardHTML(body) {
        return `<div class="card" draggable="true" >
                    <button class="card_delete">&#10006</button>
                    <p>${body}</p> 
                </div>`
    }

    renderNewCardHTML() {
        return `<div class="create_card">
                    <input placeholder="Enter card title" type="text" class="create_card_input"></input>
                    <input value="Add card" type="button" class="create_card_add"></input>
                    <input value="&#10006" type="button" class="create_card_delete"></input>
                </div>`
    }
}
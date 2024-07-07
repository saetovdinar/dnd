import CardView from './CardView';

export default class Todo {
    constructor(container) {
        this.container = container;
        this.renderColumns();
        this.addCardListener();
        this.addNewCardListener();
        this.addNewCardCancelListener();
        this.dndListener();
        this.addCardCancelListener();
        window.addEventListener('unload', this.saveInLocalStorage);
        window.addEventListener('load',this.loadLocalStorage);
    }
    renderColumns() {
        this.container.innerHTML += new CardView().renderCardContainerHTML('TODO');
        this.container.innerHTML += new CardView().renderCardContainerHTML('IN PROGRESS');
        this.container.innerHTML += new CardView().renderCardContainerHTML('DONE');
    }

    renderCard(body) {
        return new CardView().renderCardHTML(body);
    }
    
    addCardListener() {
        this.container.addEventListener('click', (event) => {
            if(event.target.classList.contains('card_container_add')) {
                event.target.closest('.card_container').querySelector('.card_container_content').insertAdjacentHTML('afterend', new CardView().renderNewCardHTML()); 
            
            }
        })
 
    }
    addNewCardListener() {
        this.container.addEventListener('click', (event) => {
            if(event.target.classList.contains('create_card_add')) {
                const inputValue = event.target.closest('.create_card').querySelector('.create_card_input').value;
                event.target.closest('.card_container').querySelector('.card_container_content').innerHTML += this.renderCard(inputValue);
                event.target.closest('.create_card').remove();
            }
   
        })
    }
    addNewCardCancelListener() {
        this.container.addEventListener('click', (event) => {
            if(event.target.classList.contains('create_card_delete')) {
                event.target.closest('.create_card').remove();
            }
        })
    }
    addCardCancelListener() {
        this.container.addEventListener('click', (event) => {
            if(event.target.classList.contains('card_delete')) {
                event.target.closest('.card').remove();
            }
        })
    }
    dndListener() {
        
        
        document.addEventListener('dragstart', (event) => {
            if(!event.target.classList.contains('card')) {
                return;
            }
            
            const card = event.target;
            card.classList.add('grabbable');
            card.ondragend = function() {
                card.classList.remove('grabbable');
                
              };
        });

        document.addEventListener('dragover', (event) => {
            event.preventDefault();

     
            const draggableItem = document.querySelector('.grabbable');
            const siblings =[ ...document.querySelectorAll('.card:not(.grabbable)')];
            
            const nextSibling = siblings.find(sibling => {
                return (event.clientY <= sibling.offsetTop + sibling.offsetHeight && event.clientX <= sibling.offsetLeft + sibling.offsetWidth );

            });
            if(!nextSibling) {
                return;
            }
            nextSibling.after(draggableItem);
            
        });
        document.addEventListener('dragenter', (event) => {
            event.preventDefault();
        });
        
    }
    saveInLocalStorage() {
        localStorage.setItem('container', JSON.stringify(this.container.innerHTML));
    }
    loadLocalStorage() {
        this.container.innerHTML = JSON.parse(localStorage.getItem('container'));
    }
}
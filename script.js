class Desk {
    constructor(name) {
        this.container = document.getElementById('desk_container');
        this.name  = name;
        this.itemsObj = [];
        this.renderedItems = [];
        this.deskHtml = null;
        this.itemsButton = null;
        this.inputTodo = null;
        this.idCounter = 0;
        this.deskInner = null;
    }

    pushItem(item) {
        this.itemsObj.push({id: this.idCounter, item: item});
        this.idCounter = this.idCounter + 1;
    }

    renderItems() {
        let items = this.itemsObj.map( (item) => {

            let element = document.createElement('div');
            element.dataset.id = item.id;
            element.classList.add('desk_item');
            element.innerText = item.item;
            element.addEventListener('click', (e) => this.deskItemHandler(e.currentTarget))
            return element;
        })

        this.renderedItems = items;
    }

    deskItemHandler(item) {
        for (let it of this.itemsObj) {

            if (item.dataset.id == it.id) {
                this.itemsObj.splice(this.itemsObj.indexOf(it), 1);
            }
        }

        this.renderItems();
        this.renderInner();
    }

    itemsButtonHandler() {
        if (!this.inputTodo.value) return;

        this.pushItem(this.inputTodo.value);
        this.renderItems();
        this.renderInner();
    }

    renderItemsButton() {
        const btn = document.createElement('input');

        btn.type = 'button';
        btn.classList.add('desk_btn_items');
        btn.value = 'Добавить to do';
        btn.addEventListener('click', () => this.itemsButtonHandler())

        this.itemsButton = btn;
    }

    renderDesk() {
        let desk = document.createElement('div');
        desk.classList.add('desk');
    
        desk.innerHTML = `
            <div class="desk_head">
                <div class="desk_label">Доска: ${this.name} </div>
            </div>
            <div class="items_list">
                ${this.renderedItems}
            </div>
        `;

        let deskHead = desk.querySelector('.desk_head');
        let inputTodo = document.createElement('input');

        inputTodo.id = 'input_todo';
        inputTodo.type = 'text';
        inputTodo.placeholder = 'Введите to do...';
        this.inputTodo = inputTodo;

        deskHead.appendChild(this.inputTodo);
        deskHead.appendChild(this.itemsButton);
        
        this.deskHtml = desk;
        this.deskInner = desk.querySelector('.items_list');
        this.appendDesk();
    }

    renderInner() {
        let inner = this.deskInner;
        inner.innerHTML = '';

        for (let item of this.renderedItems) {
            inner.appendChild(item);
        }
    }

    appendDesk() {
        this.container.appendChild(this.deskHtml);
    }

}

let arr = [];

document.getElementById('desk_create').addEventListener('click', () => {
    let input = document.getElementById('desk_name').value;
    if (!input) return;

    let desk = new Desk(input);
    desk.renderItemsButton()
    desk.renderDesk();

    arr.push(desk);
})


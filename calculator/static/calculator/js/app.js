let transaction_table_column_details = {
        "Date": {
            has_input: true,
            input_attributes: {
            "type": "date",
            "required": true
            }
        },
        "Action": {
            has_input: true,
            input_attributes: {
            "required": true
            }
        },
        "Asset Name": {
            has_input: false,
        },
        "Amount": {
            has_input: true,
            input_attributes: {
            "type": "number",
            "step": "0.01",
            "required": true
            }
        },
        "Share Price": {
            has_input: false,
        },
        "Share Quantity": {
            has_input: true,
            input_attributes: {
                "type": "number",
                "step": "0.00001",
                "required": true
            }
        },
        "Total Gain": {
            has_input: false,
        },
        "Tax Due": {
            has_input: false,
        },
    }

let base_button_classes = `mt-2 p-2 text-white rounded-xl cursor-pointer`;

let transaction_button = document.querySelector("div + button");
let transaction_table = document.querySelector("table");

let create_cancel_tranaction_button = () => {

    let cancel_button_text = "Cancel Transaction"
    let cancel_button_classes = `bg-red-600 hover:bg-red-700 ml-2 ${base_button_classes}`

    let cancel_button = document.createElement("button")
    cancel_button.textContent = cancel_button_text
    cancel_button.className = cancel_button_classes
    cancel_button.dataset.action = "cancel"

    transaction_button.insertAdjacentElement("afterend", cancel_button)
    cancel_button.addEventListener("click", transaction_button_listener)
}

let cancel_transaction = () => {
    let cancel_button = transaction_button.nextElementSibling
    let rows = transaction_table.querySelectorAll("tr")
    let last_row = rows[rows.length - 1]

    last_row.remove()
    cancel_button.remove()
}

let toggle_add_or_submit_transaction_button = (action) => {

    let new_button_text = action == "add" ? "Submit Transaction" : "Add Transaction"
    let new_button_action = action == "add" ? "submit" : "add"
    let new_button_classes = `bg-green-600 hover:bg-green-700 ${base_button_classes}`

    transaction_button.textContent = new_button_text;
    transaction_button.className = new_button_classes;
    transaction_button.dataset.action = new_button_action

    if (action == "add") {
        add_row_to_table()
    }
}

let add_row_to_table = () => {

    let num_cells = 8

    let new_row = transaction_table.insertRow(-1)
    
    for (let cell_num=1; cell_num<=num_cells; cell_num++) {
        let cell_header = transaction_table.querySelector(
            `th:nth-child(${cell_num})`).textContent
        add_cell_to_row(cell_header, new_row)
    }

    first_input = new_row.querySelector("input")
    first_input.focus()
}

let add_cell_to_row = (cell_header, row) => {

    let cell_classes = "p-2 w-1/8 truncate"
    let input_classes = "border border-black rounded-sm text-md p-1 w-full text-left"

    let new_cell = row.insertCell(-1)
    new_cell.className = cell_classes

    if (transaction_table_column_details[cell_header].has_input) {
        let input = document.createElement("input")
        input.className = input_classes
        
        input_attributes = transaction_table_column_details[
            cell_header].input_attributes
        Object.assign(input, input_attributes || {})
        new_cell.appendChild(input)
    } else {
        new_cell.textContent = "-"
    }
}

let add_transaction = () => {

    create_submit_transaction_button()
    add_row_to_table()
}

let transaction_button_listener = (e) => {

    action = e.target.dataset.action

    if (action == "add") {
        create_cancel_tranaction_button()
    } else if (action == "cancel") {
        cancel_transaction()
    }
    toggle_add_or_submit_transaction_button(action)
}

let initial_button_action = "initial"
toggle_add_or_submit_transaction_button(initial_button_action)

transaction_button.addEventListener("click", transaction_button_listener)
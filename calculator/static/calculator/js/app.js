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

let transaction_button = document.querySelector("div + button");

let toggle_add_or_submit_transaction_button = (action) => {

    let new_button_text = action == "add" ? "Submit Transaction" : "Add Transaction"
    let new_button_colour = action == "add" ? "red" : "green"
    let new_button_action = action == "add" ? "submit" : "add"
    let new_button_classes = `bg-${new_button_colour}-600 
        hover:bg-${new_button_colour}-700 text-white p-2 
        mt-2 rounded-xl cursor-pointer`;

    transaction_button.textContent = new_button_text;
    transaction_button.className = new_button_classes;
    transaction_button.dataset.action = new_button_action

    if (action == "add") {
        add_row_to_table()
    }
}

let add_row_to_table = () => {

    let num_cells = 8

    let transaction_table = document.querySelector("table");
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


    console.log(cell_header)
    console.log(transaction_table_column_details[cell_header].has_input)
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

    console.log(e)
    action = e.target.dataset.action
    toggle_add_or_submit_transaction_button(action)

}

let initial_button_action = "initial"
toggle_add_or_submit_transaction_button(initial_button_action)

transaction_button.addEventListener("click", transaction_button_listener)
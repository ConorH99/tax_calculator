let add_transaction_button = document.querySelector("div + button");

add_transaction_button.addEventListener("click", () => {

    let num_cells = 8

    let transaction_table = document.querySelector("table");
    let new_row = transaction_table.insertRow(-1)
    
    for (let cell_num=1; cell_num<=num_cells; cell_num++) {
        let new_cell = new_row.insertCell(-1)
        new_cell.className = "p-2 w-1/8 truncate"

        add_input_to_cell(new_cell, cell_num)
    }
})

add_input_to_cell = (cell, cell_num) => {

    let cols_without_input = [3, 5, 7, 8]

    if (!cols_without_input.includes(cell_num)) {
        let input = document.createElement("input")
        input.className = "w-full text-center"
        cell.appendChild(input)
    } else {
        cell.textContent = "-"
    }
}
let add_transaction_button = document.querySelector("div + button");

add_transaction_button.addEventListener("click", () => {

    let num_cells = 8

    let transaction_table = document.querySelector("table");
    let new_row = transaction_table.insertRow(-1)
    
    for (let cell_num=1; cell_num<=num_cells; cell_num++) {
        add_cell_to_row(cell_num, new_row)
    }

    first_input = new_row.querySelector("input")
    first_input.focus()
})

add_cell_to_row = (cell_num, row) => {

    let cols_without_input = [3, 5, 7, 8]

    let new_cell = row.insertCell(-1)
    new_cell.className = "p-2 w-1/8 truncate"

    if (!cols_without_input.includes(cell_num)) {
        let input = document.createElement("input")
        input.className = "border border-black rounded-sm text-md p-1 w-full text-left"
        new_cell.appendChild(input)
    } else {
        new_cell.textContent = "-"
    }
}
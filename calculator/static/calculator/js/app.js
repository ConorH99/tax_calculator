let add_transaction_button = document.querySelector("div + button");
let transaction_table = document.querySelector("table");
let ticker_input = document.querySelector("input[name=ticker]")

let make_request = async (url, method, body, headers={}) => {

    if (Object.keys(headers).length === 0) {
        headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
            ...headers
        }
    }

    let data = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }
        return response.json()
    }).catch(error => {
        console.log(error.message)
    })

    return data
}

let autocomplete_ticker = async (ticker) => {
    let url = transaction_table.dataset.stockUrl
    let method = "POST"
    let body = {
        "ticker_content": ticker
    }

    let data = await make_request(url, method, body)

    asset_display = data.asset_autocomplete_list.map((asset_details) => {
        return `${asset_details.ticker} - ${asset_details.name}`
    })

    awesomplete_instance.list = asset_display
}

let select_asset = (selected_text) => {
    let selected_name = selected_text.split(" - ")[1]
    let asset_name_input = document.querySelector("input[name=asset_name]")
    asset_name_input.value = selected_name
}

let ticker_input_listener = async (e) => {
    if (e.type == "input"){
        await autocomplete_ticker(e.target.value)
    }
    else {
        select_asset(e.text)
    }
}

let awesomplete_instance = new Awesomplete(ticker_input, {
        replace: (suggestion) => {
            let ticker = suggestion.split(" - ")[0]
            ticker_input.value = ticker
        }
    }
)

add_transaction_button.addEventListener("click", (e) => {
    let add_transaction_modal = document.querySelector("dialog")
    add_transaction_modal.showModal()
})
ticker_input.addEventListener("input", ticker_input_listener)
ticker_input.addEventListener("awesomplete-selectcomplete", ticker_input_listener)
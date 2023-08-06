// DOM elements
const groceryList = document.getElementById('list')
const groceryInput = document.getElementById('newItem')
const addGroceryBtn = document.getElementById('addGrocery')
const clearBtn = document.getElementById('clear')

// Store initial state
const initialState = {
    groceries: []
}

// Reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'groceries/clear':
            return initialState
        case 'groceries/add':
            return { groceries: [...state.groceries, action.payload] }
        default:
            return state
    }
}

// Create store
let store = Redux.createStore(reducer)

// Dispatch functions
const clearList = () => {
    groceryInput.value = ''
    store.dispatch({type: 'groceries/clear'})
}

const newGrocery = (e) => {
    e.preventDefault()
    store.dispatch({type: 'groceries/add', payload: groceryInput.value})
    console.log(store.getState())
}

// Event listeners
addGroceryBtn.addEventListener('click', newGrocery)
clearBtn.addEventListener('click', clearList)

// Render data
const renderList = () => {
    const state = store.getState()
    while(groceryList.firstChild) {
        groceryList.removeChild(groceryList.firstChild)
    }
    state.groceries.forEach(grocery => {
        // Generate a new list element for each grocery item
        let li = document.createElement('li')
        // Append the new element to our list DOM element, we targeted
        // it at the beginning of this code-along!
        groceryList.appendChild(li)
        // Populate the text content of the list item
        li.textContent = grocery
    })
}

// Subscribe
store.subscribe(renderList)

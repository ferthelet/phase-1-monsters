// When the page loads, show the first 50 monsters.
// Each monster's name, age, and description should be shown.
// Above your list of monsters, you should have a form to create a new monster.
// You should have fields for name, age, and description, and a '
// Create Monster Button'. When you click the button, the monster should be
// added to the list and saved in the API.
// At the end of the list of monsters, show a button. When clicked, the button
// should load the next 50 monsters and show them.

// There should be a form to create new monsters
// There should be a button to load more monsters
// Each monster should be rendered as a `div`
// Each monster's name, age, and description should be shown
// Your form should have fields for name, age, and description, and a create
// button

const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

const getMonsters = (page) => {
    console.log('get monsters function')
    fetch(URL_PREFIX + `monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            document.querySelector('#monster-container').innerHTML = '';
            for (let i = 0; i < monsters.length; i++) {
                console.log('monster', monsters[i])
                createMonsterCard(monsters[i])
            }
        })
}

const createMonsterCard = (monster) => {
    let monsterDiv = document.createElement('div');
    let monsterName = document.createElement('h2');
    let monsterAge = document.createElement('h4');
    let monsterDescription = document.createElement('p');

    monsterName.innerHTML = `${monster.name}`;
    monsterAge.innerHTML = `Age: ${monster.age}`;
    monsterDescription.innerHTML = `Bio: ${monster.description}`;

    monsterDiv.appendChild(monsterName);
    monsterDiv.appendChild(monsterAge);
    monsterDiv.appendChild(monsterDescription);

    document.querySelector('#monster-container').appendChild(monsterDiv);
}

const createMonsterForm = () => {
    const monsterForm = document.createElement('form');
    const monsterName = document.createElement('input');
    const monsterAge = document.createElement('input');
    const monsterDescription = document.createElement('input');
    const monsterSubmit = document.createElement('button');

    monsterForm.id = 'monster-form';
    monsterName.id = 'name';
    monsterAge.id = 'age';
    monsterDescription.id = 'description';
    monsterName.placeholder = 'name...';
    monsterAge.placeholder = 'age...';
    monsterDescription.placeholder = 'description...';
    monsterSubmit.innerHTML = 'Create';

    monsterForm.appendChild(monsterName);
    monsterForm.appendChild(monsterAge);
    monsterForm.appendChild(monsterDescription);
    monsterForm.appendChild(monsterSubmit);

    document.getElementById('create-monster').appendChild(monsterForm);
    addSubmitEventListener();
}

const addSubmitEventListener = () => {
    document.querySelector('#monster-form').addEventListener('submit', event => {
        event.preventDefault();
        console.log('submitted', getFormData());
        postNewMonster(getFormData());
        clearForm();
    })
}

const getFormData = () => {
    return {
        name: document.querySelector('#name').value,
        age: document.querySelector('#age').value,
        description: document.querySelector('#description').value
    }
}

const postNewMonster = (monster) => {
    fetch(URL_PREFIX + 'monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
    })
        .then(response => response.json())
        .then(monster => createMonsterCard(monster))
}

const clearForm = () => {
    document.querySelector('#name').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#description').value = '';
}

const addNavListeners = () => {
    document.querySelector('#forward').addEventListener('click', event => {
        page++;
        getMonsters(page);
    })

    document.querySelector('#back').addEventListener('click', event => {
        if (page > 1) {
            page--;
            getMonsters(page);
        }
    })
}

document.addEventListener('DOMContentLoaded', event => {
    getMonsters(page);
    createMonsterForm();
    addNavListeners();
}
)


const addButton = document.querySelector("#addButton")
const empTable = document.querySelector("#empTable")
const empName = document.querySelector("#name")
const editor_id = document.querySelector('#edited_id')
const editor_name = document.querySelector('#edited_name')
const saveButton = document.querySelector('#saveButton')
const confirmDelButton = document.querySelector('#confirmDelButton')
var tbody = document.createElement('tbody')
empTable.appendChild(tbody)

let actualTr = null;

const host = 'http://localhost:3000';

(()=>{
   getEmployees()
})()

function getEmployees() {
    let endpoint = 'employees'
    let url = `${host}/${endpoint}`
    fetch(url)
    .then( response => response.json())
    .then( result => {
        renderTable(result)
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!')
        console.log(error)
    })

}

function renderTable(employees) {
    tbody.innerHTML = ''
    employees.forEach( employee => {
        let tr = document.createElement('tr')
        let tdId = document.createElement('td')
        let tdName = document.createElement('td')
        let tdButton = document.createElement('td')
        let delBtn = makeDelButton(employee.id)
        let editBtn = makeEditButton(employee)

        tr.appendChild(tdId)
        tr.appendChild(tdName)
        tr.appendChild(tdButton)
        tdButton.appendChild(delBtn)
        tdButton.appendChild(editBtn)
        tbody.appendChild(tr)
    
        tdId.textContent = employee.id
        tdName.textContent = employee.name  
    })
}

function makeDelButton(id) {

    let delBtn = document.createElement('button')
    delBtn.classList = 'btn btn-danger'
    delBtn.textContent = 'Törlés'

    delBtn.setAttribute('data-bs-toggle', 'modal')
    delBtn.setAttribute('data-bs-target', '#confirmDelModal')

    delBtn.addEventListener('click', () => console.log("delBtnre katt"))


    console.log("makeDelButon");



    return delBtn
}

confirmDelButton.addEventListener('click', ()=> {

    deleteEmployee(id)
    // actualTr = delBtn.parentElement.parentElement
    // actualTr.parentNode.removeChild(actualTr)

})

addButton.addEventListener('click', () => {
    addEmployee()

})

function addEmployee() {
    let endpoint = 'employees'
    let url = `${host}/${endpoint}`   
    let employee = {
        name: empName.value
    }
    fetch(url, {
        method: 'post',
        body: JSON.stringify(employee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        empName.value = ''
        addEmployeeToTable(result)
    })

}

function addEmployeeToTable(employee) {
    let tr = document.createElement('tr')
    let tdId = document.createElement('td')
    let tdName = document.createElement('td')
    let tdButtons = document.createElement('td')

    tdId.textContent = employee.id
    tdName.textContent = employee.name

    tr.appendChild(tdId)
    tr.appendChild(tdName)
    tr.appendChild(tdButtons)

    let delButton = makeDelButton(employee.id)
    let editButton = makeEditButton(employee)

    tdButtons.appendChild(delButton)
    tdButtons.appendChild(editButton)
    tbody.appendChild(tr)
}

function deleteEmployee(id) {
    let endpoint = 'employees';
    let url = `${host}/${endpoint}/${id}`

    console.log("deleteEmployee");
    // fetch(url, {
    //     method: 'delete'
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log(result)
    // })
}

function makeEditButton(employee) {
    let editBtn = document.createElement('button')

    editBtn.classList.add('btn')
    editBtn.classList.add('btn-info')
    editBtn.textContent = 'Módosítás'
    editBtn.classList = 'btn btn-warning ms-3'

    editBtn.setAttribute('data-bs-toggle', 'modal')
    editBtn.setAttribute('data-bs-target', '#editModal')
    editBtn.setAttribute('data-id', employee.id)
    editBtn.setAttribute('data-name', employee.name)


    editBtn.addEventListener('click', () => {
        editor_id.value = editBtn.dataset.id
        editor_name.value = editBtn.dataset.name
        actualTr = editBtn.parentElement.parentElement
    })

    return editBtn
}

function updateEmployee() {

    let endpoint = `employees/${editor_id.value}`

    let url = `${host}/${endpoint}`

    fetch(url, {
        method: 'put',
        body: JSON.stringify({
            id: editor_id.value,
            name: editor_name.value
    }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(res => console.log(res))
}

saveButton.addEventListener('click', () => {
    
    actualTr.childNodes[1].textContent = editor_name.value

    updateEmployee()

    editor_id.value = ''
    editor_name.value = ''
})
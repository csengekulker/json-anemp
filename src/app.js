const addButton = document.querySelector("#addButton");
const empTable = document.querySelector("#empTable");
const empName = document.querySelector("#name");
const editor_id = document.querySelector('#edited_id')
const editor_name = document.querySelector('#edited_name')
const saveButton = document.querySelector('#saveButton')
var tbody = document.createElement('tbody');
empTable.appendChild(tbody);

const host = 'http://localhost:3000';


(()=>{
   getEmployees();
})();

function getEmployees() {
    let endpoint = 'employees';
    let url = `${host}/${endpoint}`
    fetch(url)
    .then( response => response.json())
    .then( result => {
        renderTable(result);
    })
    .catch(error => {
        console.log('Hiba! A lekérdezés sikertelen!');
        console.log(error);
    });    

}

function renderTable(employees) {
    tbody.innerHTML = '';
    employees.forEach( employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdButton = document.createElement('td');
        let delBtn = makeDelButton(employee.id);
        let editBtn = makeEditButton(employee);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);
        tdButton.appendChild(delBtn);
        tdButton.appendChild(editBtn);
        tbody.appendChild(tr);
    
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;        
    });
}

function makeDelButton(id) {
    let delBtn = document.createElement('button');
    delBtn.classList = 'btn btn-danger ms-0'
    delBtn.textContent = 'Törlés';
    delBtn.addEventListener('click', ()=> {
        let answer = confirm('Biztosan törlöd?');
        if (answer) {
            deleteEmployee(id);
            let actualTr = delBtn.parentElement.parentElement;
            actualTr.parentNode.removeChild(actualTr);
        }        
    });
    return delBtn;
}

addButton.addEventListener('click', () => {
    addEmployee();

});

function addEmployee() {
    let endpoint = 'employees';
    let url = `${host}/${endpoint}`   
    let employee = {
        name: empName.value
    };
    fetch(url, {
        method: 'post',
        body: JSON.stringify(employee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        empName.value = '';
        addEmployeeToTable(result);
    });

}

function addEmployeeToTable(employee) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdDel = document.createElement('td');
    let tdEdit = document.createElement('td');

 
    tdId.textContent = employee.id
    tdName.textContent = employee.name

    tr.appendChild(tdId)
    tr.appendChild(tdName)
    tr.appendChild(tdDel)
    tr.appendChild(tdEdit)

    let delButton = makeDelButton(employee.id)
    let editButton = makeEditButton(employee)

    tdDel.appendChild(delButton)
    tdDel.appendChild(editButton)
    tbody.appendChild(tr)
}

function deleteEmployee(id) {
    let endpoint = 'employees';
    let url = `${host}/${endpoint}/${id}`
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    })
}

function makeEditButton(employee) {
    let editBtn = document.createElement('button')

    editBtn.classList.add('btn')
    editBtn.classList.add('btn-info')
    editBtn.textContent = 'Módosítás'
    editBtn.classList = 'btn btn-warning ms-3'

    editBtn.setAttribute('data-id', employee.id)
    editBtn.setAttribute('data-name', employee.name)


    editBtn.addEventListener('click', ()=> {
        editor_id.value = editBtn.dataset.id
        editor_name.value = editBtn.dataset.name
    })

    return editBtn
}

function editEmployee() {

}
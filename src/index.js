import axios from 'axios';

const content = document.querySelector('#content');
const createEl = (el = 'div') => document.createElement(el);
let guestList;

const renderMain = async () => {
  const tables = (await axios.get('/tables')).data;
  const tableRelation = tables.map((table) => table.relation);
  for (let table of tables) {
    const tableDiv = createEl();
    tableDiv.className = 'table';
    tableDiv.id = `t${table.table_number}`;
    tableDiv.innerHTML = `TABLE ${table.table_number} <br>(${table.relation})`;
    content.appendChild(tableDiv);
    renderGuests(table.table_number);
  }
  renderAddGuest();
  renderAddTable(tableRelation);
};

const addTableToTables = async (newTable) => {
  const tableDiv = createEl();
  tableDiv.className = 'table';
  tableDiv.id = `t${newTable.table_number}`;
  tableDiv.innerHTML = `TABLE ${newTable.table_number}: <br>(${newTable.relation})`;
  content.appendChild(tableDiv);
};

const renderGuests = async (tableId) => {
  guestList = (await axios.get('/guests')).data;
  const tableGuests = guestList.filter((guest) => guest.table_id === tableId);
  const table = document.querySelector(`#t${tableId}`);
  for (let guest of tableGuests) {
    const guestP = createEl('p');
    guestP.className = 'guestName';
    guestP.id = `g${guest.id}`;
    guestP.innerHTML = `${guest.first_name} ${guest.last_name}`;
    table.appendChild(guestP);
  }
};

const addGuestToTable = async (guest) => {
  const table = document.querySelector(`#t${guest.table_id}`);
  const guestP = createEl('p');
  guestP.className = 'guestName';
  guestP.id = 'guest.id';
  guestP.append(
    document.createTextNode(`${guest.first_name} ${guest.last_name}`)
  );
  table.appendChild(guestP);
  guestP.id = `g${guest.id}`;
};

const renderAddGuest = async () => {
  const formDiv = createEl('div');
  formDiv.className = 'form';
  [
    { text: 'First Name', id: 'firstName' },
    { text: 'Last Name', id: 'lastName' },
    { text: 'Table Assignment', id: 'tableId' },
    { text: 'Guest Of', id: 'guestOf' },
  ].forEach((formLabel) => {
    const label = createEl('label');
    const input = createEl('input');
    input.id = formLabel.id;
    label.append(document.createTextNode(`${formLabel.text}: `), input);
    formDiv.append(label, input);
  });

  const createGuest = createEl('button');
  createGuest.id = 'createGuest';
  createGuest.appendChild(document.createTextNode('Add Guest'));
  formDiv.appendChild(createGuest);
  content.appendChild(formDiv);
};

const renderAddTable = async (tableRelation) => {
  const formDiv = createEl('div');
  formDiv.className = 'form';

  const label = createEl('label');
  const select = createEl('select');
  const createTable = createEl('button');
  createTable.id = 'createTable';

  tableRelation.forEach((relation) => {
    const option = createEl('option');
    option.appendChild(document.createTextNode(`${relation}`));
    select.appendChild(option);
  });
  createTable.appendChild(document.createTextNode('Add Table'));
  label.append(document.createTextNode(`Create New Table: `));
  formDiv.append(label, select, createTable);

  content.appendChild(formDiv);
};

document.addEventListener('click', async (event) => {
  try {
    const target = event.target;
    if (target.id === 'createGuest') {
      const guest = {
        first_name: document.querySelector('#firstName').value,
        last_name: document.querySelector('#lastName').value,
        table_id: document.querySelector('#tableId').value,
        guest_of: document.querySelector('#guestOf').value,
      };
      const table = document.querySelector(`#t${guest.table_id}`);
      const checkNames = guestList.map((name) => name.first_name);
      if (!guest.first_name) {
        alert('Please enter a first name.');
      } else if (!table) {
        alert('Table does not exist, please choose another table.');
      } else if (guest.guest_of && !checkNames.includes(guest.guest_of)) {
        alert('Invalid Guest Of entry. Please check your spelling!');
      } else if (table.children.length > 7) {
        alert('Table is full!');
        document.querySelector('#tableId').value = '';
      } else {
        await axios.post('/guests', guest);
        guestList = (await axios.get('/guests')).data;
        const newGuest = guestList[guestList.length - 1];
        addGuestToTable(newGuest);
        //is there a better way to do this?
        document.querySelector('#firstName').value = '';
        document.querySelector('#lastName').value = '';
        document.querySelector('#tableId').value = '';
        document.querySelector('#guestOf').value = '';
      }
    }
    if (target.id === 'createTable') {
      const tableLength = await document.querySelectorAll('.table').length;
      const newTable = {
        table_number: tableLength + 1,
        relation: document.querySelector('select').value,
      };
      await axios.post('/tables', newTable);
      addTableToTables(newTable);
    }
    if (target.className === 'guestName') {
      const guestId = target.id.slice(1);
      window.open(`/guests/${guestId}`, 'popup', 'width=400,height=400');
    }
  } catch (err) {
    console.log(err);
  }
});

renderMain();

export default renderMain;

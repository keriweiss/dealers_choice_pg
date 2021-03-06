import axios from 'axios';
import renderMain from './main/main';
import { renderGuests, addGuestToTable } from './main/guest';
import addTableToTables from './main/addtable';

const content = document.querySelector('#content');
const createEl = (el = 'div') => document.createElement(el);

document.addEventListener('click', async (event) => {
  let guestList = (await axios.get('/api/guests')).data;
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
        await axios.post('/api/guests', guest);
        guestList = (await axios.get('/api/guests')).data;
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
      await axios.post('/api/tables', newTable);
      addTableToTables(newTable);
    }
    if (target.className === 'guestName') {
      const guestId = target.id.slice(1);
      window.open(`/api/guests/${guestId}`, 'popup', 'width=400,height=400');
    }
    if (target.className === 'deletetable') {
      const tableToDelete = document.querySelector(
        `#${target.parentElement.id}`
      );
      console.log(tableToDelete);
      if (tableToDelete.children.length <= 2) {
        await axios.delete(`/api/tables`, {
          data: { id: target.parentElement.id.slice(1) },
        });
        content.removeChild(tableToDelete);
      } else {
        alert('Can not delete table with guests.');
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const deleteTableButton = createEl('button');

document.addEventListener('mouseover', async (event) => {
  const target = event.target;
  if (target.className === 'table') {
    const table = document.querySelector(`#${target.id}`);
    deleteTableButton.innerHTML = 'Delete Table';
    deleteTableButton.className = 'deletetable';
    table.appendChild(deleteTableButton);
  }
});

document.addEventListener('mouseout', async (event) => {
  const target = event.target;
  const child = event.relatedTarget;
  if (target.className === 'table') {
    if (child.parentElement.className !== 'table') {
      const table = document.querySelector(`#${target.id}`);
      table.removeChild(deleteTableButton);
    }
  }
});

renderMain();

export { createEl, renderGuests, content };

import axios from 'axios';
import { createEl } from '../index';

const renderGuests = async (tableId) => {
  const guestList = (await axios.get('/api/guests')).data;
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

export { renderGuests, addGuestToTable };

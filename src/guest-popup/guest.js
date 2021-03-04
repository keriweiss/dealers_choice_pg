import { createEl, content, guestId } from '../guest';
import axios from 'axios';

let guest, guests;

const renderGuest = async () => {
  guests = (await axios.get('/api/guests')).data;
  guest = guests.filter((guest) => guest.id === guestId * 1);

  const { first_name, last_name, table_id, guest_of } = guest[0];
  const name = createEl('p');
  name.append(document.createTextNode(`Name: ${first_name} ${last_name}`));
  const table = createEl('p');
  table.append(document.createTextNode(`Table: ${table_id}`));

  const guestDiv = createEl();
  guestDiv.className = 'guest';
  guestDiv.append(name, table);

  if (guest_of) {
    const guestOf = createEl('p');
    const plusOne = guests.filter((guest) => guest.id === guest_of);
    guestOf.append(
      document.createTextNode(
        `Guest Of: ${plusOne[0].first_name} ${plusOne[0].last_name}`
      )
    );
    guestDiv.append(guestOf);
  }

  const deleteButton = createEl('button');
  deleteButton.innerHTML = 'Delete Guest';
  guestDiv.appendChild(deleteButton);

  content.appendChild(guestDiv);
};

export { renderGuest, guests, guest };

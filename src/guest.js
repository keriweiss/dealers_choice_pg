import axios from 'axios';

const content = document.querySelector('#guestcontent');
const createEl = (el = 'div') => document.createElement(el);
const guestId = location.pathname.substring(
  location.pathname.lastIndexOf('/') + 1
);
let guests, guest;

const renderGuest = async () => {
  guests = (await axios.get('/guests')).data;
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

const deleteComplete = () => {
  console.log('done');
};

document.addEventListener('click', async (ev) => {
  const target = ev.target;
  if (target.tagName === 'NAV') {
    window.close();
  }
  console.log;
  if (target.tagName === 'BUTTON') {
    const guestsWithGuests = guests.map((guest) => guest.guest_of);
    console.log(guestsWithGuests, guestId);
    if (guestsWithGuests.includes(guestId * 1)) {
      alert(
        'Cannot delete guest with a plus one. Please delete plus one first.'
      );
    } else {
      await axios.delete(`/guests/${guestId}`, guest[0]);
      window.opener.location.reload();
      window.close();
    }
  }
});

renderGuest();

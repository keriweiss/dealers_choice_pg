import axios from 'axios';
import { renderGuest, guests, guest } from './guest-popup/guest';

const content = document.querySelector('#guestcontent');
const createEl = (el = 'div') => document.createElement(el);
const guestId = location.pathname.substring(
  location.pathname.lastIndexOf('/') + 1
);

document.addEventListener('click', async (ev) => {
  const target = ev.target;
  if (target.tagName === 'NAV') {
    window.close();
  }
  if (target.tagName === 'BUTTON') {
    const guestsWithGuests = guests.map((guest) => guest.guest_of);
    if (guestsWithGuests.includes(guestId * 1)) {
      alert(
        'Cannot delete guest with a plus one. Please delete plus one first.'
      );
    } else {
      await axios.delete(`/api/guests/${guestId}`, guest[0]);
      window.opener.location.reload();
      window.close();
    }
  }
});

renderGuest();

export { createEl, content, guestId };

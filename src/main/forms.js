import { content, createEl } from '../index';

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

export { renderAddGuest, renderAddTable };

import axios from 'axios';
import { createEl } from '../index.js';
import { renderGuests } from './guest';
import { renderAddTable, renderAddGuest } from './forms';

const renderMain = async () => {
  const tables = (await axios.get('/api/tables')).data;
  const tableRelation = tables.map((table) => table.relation);
  for (let table of tables) {
    const tableDiv = createEl();
    tableDiv.className = 'table';
    tableDiv.id = `t${table.table_number}`;
    tableDiv.innerHTML = `TABLE ${table.table_number} <br>(${table.relation})`;
    //content here is undefined so it blows up your entire app
    content.appendChild(tableDiv);
    renderGuests(table.table_number);
  }
  renderAddGuest();
  renderAddTable(tableRelation);
};

export default renderMain;

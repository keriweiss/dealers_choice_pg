import { createEl, content } from '../index';

const addTableToTables = async (newTable) => {
  const tableDiv = createEl();
  tableDiv.className = 'table';
  tableDiv.id = `t${newTable.table_number}`;
  tableDiv.innerHTML = `TABLE ${newTable.table_number}: <br>(${newTable.relation})`;
  content.appendChild(tableDiv);
};

export default addTableToTables;

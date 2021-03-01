const SQL = `
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS tables;
CREATE TABLE tables(
    id SERIAL PRIMARY KEY,
    table_number INTEGER UNIQUE,
    relation VARCHAR(100)
);
CREATE TABLE guests(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) UNIQUE NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    table_id INTEGER REFERENCES tables(table_number) NOT NULL,
    guest_of INTEGER REFERENCES guests(id)
);
INSERT INTO tables (table_number, relation) VALUES
    (1, 'friends'),
    (2, 'cousings'),
    (3, 'siblings'),
    (4, 'neices and nephews'),
    (5, 'uncles and aunts'),
    (6, 'grandparents');
INSERT INTO guests (first_name, last_name, table_id, guest_of) VALUES
    ('Talia', 'Peckerman', 3, NULL),
    ('Abby', 'Fraade', 3, NULL),
    ('Tani', 'Fraade', 3, 2),
    ('David', 'Peckerman', 3, 1),
    ('Tamara', 'Edelstein', 2, NULL),
    ('Dovie', 'Edelstein', 2, NULL),
    ('Yael', 'Edelstein', 2, 6),
    ('Aviva', 'Edelstein', 2, 9),
    ('Johnny', 'Edelstein', 2, NULL),
    ('June', 'Everett', 1, NULL),
    ('Chelsea', 'Maruskin', 1, NULL),
    ('Jerome', 'Martin', 1, 11),
    ('Zack', 'Maruskin', 1, NULL),
    ('Laura', 'Feinstein', 1, NULL),
    ('Layla', 'Peckerman', 4, 1),
    ('Nava', 'Peckerman', 4, 1),
    ('Yakira', 'Fraade', 4, 2),
    ('Lumpy', 'Fraade', 4, 2),
    ('Lenny', 'Edelstein', 5, NULL),
    ('Rochelle', 'Edelstein', 5, NULL),
    ('Linda', 'Lightstone', 5, NULL),
    ('Howie', 'Edelstein', 5, NULL),
    ('Jean', 'Edelstein', 6, NULL),
    ('Phil', 'Edelstein', 6, NULL),
    ('William', 'Weiss', 6, NULL),
    ('Elizabeth', 'Weiss', 6, NULL);
`;

module.exports = SQL;

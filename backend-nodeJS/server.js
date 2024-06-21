// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'inventory_management'
// });

// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database.........');

//     var sql = "CREATE TABLE IF NOT EXISTS products (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255), price int, quantity int, PRIMARY KEY (id))";
//     db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// // CRUD Operations
// app.get('/products', (req, res) => {
//     db.query('SELECT * FROM products', (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// app.post('/products', (req, res) => {
//     const { name, description, price, quantity } = req.body;
//     db.query('INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)', [name, description, price, quantity], (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// app.put('/products/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, description, price, quantity } = req.body;
//     db.query('UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?', [name, description, price, quantity, id], (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });

// app.delete('/products/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
//         if (err) throw err;
//         res.send(results);
//     });
// });



// app.get('/products/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
//         if (err) throw err;
//         if (results.length > 0) {
//             res.send(results[0]);
//         } else {
//             res.status(404).send({ message: 'Product not found' });
//         }
//     });
// });


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root'
};

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL server.........');

    
    db.query('CREATE DATABASE IF NOT EXISTS inventory_management', function (err, result) {
        if (err) throw err;
        console.log("Database created or already exists");

        
        dbConfig.database = 'inventory_management';
        const dbWithDatabase = mysql.createConnection(dbConfig);

        dbWithDatabase.connect(err => {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }
            console.log('Connected to inventory_management database');

            var sql = `CREATE TABLE IF NOT EXISTS products (
                id int NOT NULL AUTO_INCREMENT, 
                name VARCHAR(255), 
                description VARCHAR(255), 
                price int, 
                quantity int, 
                PRIMARY KEY (id)
            )`;
            dbWithDatabase.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created or already exists");

                // Proceed with the rest of the application setup
                setupCRUDRoutes(dbWithDatabase);
            });
        });
    });
});

// Setup CRUD routes function
function setupCRUDRoutes(db) {
    // CRUD Operations
    app.get('/products', (req, res) => {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    app.post('/products', (req, res) => {
        const { name, description, price, quantity } = req.body;
        db.query('INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)', [name, description, price, quantity], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    app.put('/products/:id', (req, res) => {
        const { id } = req.params;
        const { name, description, price, quantity } = req.body;
        db.query('UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?', [name, description, price, quantity, id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    app.delete('/products/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    app.get('/products/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        });
    });

 
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

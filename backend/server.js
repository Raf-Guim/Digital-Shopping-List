const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./db/project.db');


// Create a table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS item (iditem INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER, status BOOLEAN DEFAULT false)');

// API route to fetch all items
app.get('/backend/project/item', (req, res) => {
    db.all('SELECT * FROM item', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            } else {
            res.json(rows);
        }
    });
});

// API route to create a new item
app.post('/backend/project/item', (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    if (!name) {
        res.status(400).json({ error: 'Name is required' });
    }
    else if (!quantity) {
        res.status(400).json({ error: 'Quantity is required' });
    }
    else {
        db.run('INSERT INTO item (name, quantity) VALUES (?, ?)', [name, quantity], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json({ id: this.lastID, name, quantity });
            }
        });
    }
});

// API route to delete an item
app.delete('/backend/project/item/:name', (req, res) => {
    const { name } = req.params;
    db.run('DELETE FROM item WHERE name = ?', [name], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (this.changes > 0) {
            res.json({ success: true });
            } else {
            res.status(404).json({ error: 'Item not found' });
            }
        }
    });
});

// API route to update an item
app.put('/backend/project/item/:name', (req, res) => {
    const { name } = req.params;
    const { quantity } = req.body;
    if (!quantity) {
        db.run('UPDATE item SET status = NOT status WHERE name = ?', [name], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (this.changes > 0) {
                res.json({ success: true });
                } else {
                res.status(404).json({ error: 'Item not found' });
                }
            }
        });
    } else {
        db.run('UPDATE item SET quantity = ? WHERE name = ?', [quantity, name], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (this.changes > 0) {
                res.json({ success: true });
                } else {
                res.status(404).json({ error: 'Item not found' });
                }
            }
        });
    }
    
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

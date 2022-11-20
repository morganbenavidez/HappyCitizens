const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


/* Database Connection */

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'happyC'
});

/* Post Function for Creating Account / Registering */

app.post('/register', (req, res) => {
    /* username in req.body.username must match
    from CreateAccount file -> register f(x) -> Axios -> 'username:' */
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    const category = req.body.category;
    console.log(category);
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;

    db.query("INSERT INTO userinformation (username, password, category, name, lastname, email, phone) VALUES (?,?,?,?,?,?,?)", 
    [username, password, category, name, lastname, email, phone], (err, result) => {
        if (err) {
            console.log(err);
            res.send({message: "Username Already Exists."});
        } else {
            res.send({message: "Account Created."})
        }
    });
});

/* Post Function for Login */

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM userinformation WHERE username = ? AND password = ?", 
    [username, password], (err, result) => {
        if (err) {
            res.send({err: err});
        } 
        
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Username/Password combo doesn't exist."})
        }
        
    });
})





/* CITIZEN PROFILE */



app.post('/create', (req, res) => {
    const propertyname = req.body.propertyname;
    const propertyowner = req.body.propertyowner;
    const city = req.body.city;
    const state = req.body.state;
    const purchaseprice = req.body.purchaseprice;
    const propertycategory = req.body.propertycategory;

    db.query(
    'INSERT INTO property (propertyname, propertyowner, city, state, purchaseprice, propertycategory) VALUES (?,?,?,?,?,?)', 
    [propertyname, propertyowner, city, state, purchaseprice, propertycategory], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted")
        }
    }
    );

});


/* Get Specific Users Properties */

app.post('/properties', (req, res) => {
    const propertyowner = req.body.propertyowner;

    db.query("SELECT * FROM property WHERE propertyowner = ?", 
    [propertyowner], (err, result) => {
        if (err) {
            res.send({err: err});
        } 
        
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "User doesn't have any properties."})
        }
        
    });
})


app.put('/update', (req, res) => {
    const propertyid = req.body.propertyid;
    const propertyname = req.body.propertyname;
    console.log(propertyid);
    db.query("UPDATE property SET propertyname = ? WHERE propertyid = ?", 
    [propertyname, propertyid], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM property WHERE propertyid = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})



/*
app.get('/login', (req, res) => {
    db.query("SELECT * FROM userinformation WHERE username = ? AND password = ?", 
    [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
*/

/*

app.get('/login', (req, res) => {
    
    console.log('AQUI!');
    console.log(usernameLogin);
    db.query("SELECT * FROM userinformation WHERE username = ?", 
    [usernameLogin], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

*/
app.listen(3001, () => {
    console.log("The Server is running on Port 3000!")
});
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var ensureLoggedIn = ensureLogIn();

const MySQLStore = require("connect-mysql")(session);

const SQL_CONFIG = {
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'happyc'
};

const WHITELIST = ["http://localhost:3000",];
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: (origin, cb) => {
        if (WHITELIST.indexOf(origin) !== -1) {
            cb(null, true);
        } else {
            cb(new Error("cors"));
        }
    }
}))
app.use(session({
    secret: "happycitizens",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        config: SQL_CONFIG
    }),
}));
app.use(passport.initialize());
app.use(passport.authenticate("session"));

/* Database Connection */

const db = mysql.createConnection(SQL_CONFIG);

/* Authentication */

passport.use(new LocalStrategy((username, password, cb) => {
    db.query("SELECT * FROM userinformation WHERE username = ?", [username], (err, result) => {
        if (err) return cb(err);
        if (!result || result.length < 1) return cb(null, false, {message: "Incorrect username or password"});

        crypto.pbkdf2(password, result[0].salt, 310000, 32, "sha256", (err, hashedPassword) => {
            if (err) return cb(err);
            if (!crypto.timingSafeEqual(result[0].hashed_password, hashedPassword)) {
                return cb(null, false, {message: 'Incorrect username or password'});
            }
            return cb(null, result[0]);
        });
    });
}));

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, {id: user.userid, username: user.username, access: user.category});
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    })
})

/* Post Function for Creating Account / Registering */

const CATEGORY_CITIZEN = 1;
const CATEGORY_GOVERNMENT = 2;
const CATEGORY_INSURANCE = 3;
const CATEGORY_SUPERUSER = 4;
const USER_CATEGORIES = {
    "Citizen": CATEGORY_CITIZEN,
    "Government": CATEGORY_GOVERNMENT,
    "Super User": CATEGORY_SUPERUSER,
};

app.post('/register', (req, res) => {
    /* username in req.body.username must match
    from CreateAccount file -> register f(x) -> Axios -> 'username:' */
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;
    const category = USER_CATEGORIES[req.body.category];
    console.log(category);
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;

    if (!category) {
        return res.send({success: false, err: "Bad category"});
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hashedPassword) => {
        if (err) {
            return res.send({success: false, err: "Server error (Hashing)"});
        }

        db.query("INSERT INTO userinformation (username, hashed_password, salt, category, name, lastname, email, phone, state) VALUES (?,?,?,?,?,?,?,?,?)",
        [username, hashedPassword, salt, category, name, lastname, email, phone, 1], (err, result) => {
            if (err) {
                console.log(err);
                res.send({success: false, message: "Username Already Exists."});
            } else {
                res.send({success: true, message: "Account Created."});
            }
        });
    });
});

/* Post Function for Login */

app.post('/login', passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
}), (req, res) => {
    delete req.user.hashed_password;
    delete req.user.salt;
    res.send({
        success: true,
        user: req.user,
    });
});

/* Get your user information */

app.get('/me', ensureLoggedIn, (req, res) => {
    db.query('SELECT * FROM userinformation WHERE userid = ?', [req.user.id], (err, result) => {
        if (err || !result || result.length < 1) {
            console.log(err);
            return res.send({success: false});
        } else {
            let user = result[0];
            delete user.hashed_password;
            delete user.salt;
            res.send({
                success: true,
                user: user
            });
        }
    });
});

/* Grant other users access to your properties */

app.post('/grant/:username', ensureLoggedIn, (req, res) => {
    const username = req.params.username;

    db.query('INSERT INTO accountaccess (userid, granted) SELECT ?, userid FROM userinformation WHERE username = ?', [req.user.id, username], (err, result) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false
            });
        } else {
            res.send({
                success: true,
                message: "Access granted"
            });
        }
    });
})

/* CITIZEN PROFILE */

const CATEGORY_LAND = 1;
const CATEGORY_STRUCTURE = 2;
const CATEGORY_ELECTRONICS = 3;
const CATEGORY_JEWELRY = 4;
const CATEGORY_SINGLE_FAMILY_HOME = 5;
const CATEGORY_MULTI_FAMILY_HOME = 6;
const CATEGORY_VEHICLE = 7;
const CATEGORY_BOAT = 8;

const PROPERTY_CATEGORIES = {
    "Land": CATEGORY_LAND,
    "Structure": CATEGORY_STRUCTURE,
    "Electronics": CATEGORY_ELECTRONICS,
    "Jewelry": CATEGORY_JEWELRY,
    "Single-Family Home": CATEGORY_SINGLE_FAMILY_HOME,
    "Multi-Family Home": CATEGORY_MULTI_FAMILY_HOME,
    "Vehicle": CATEGORY_VEHICLE,
    "Boat": CATEGORY_BOAT,
}

app.post('/create', ensureLoggedIn, (req, res) => {
    const propertyowner = req.user.id;
    const propertyname = req.body.propertyname;
    const city = req.body.city;
    const state = req.body.state;
    const purchaseprice = req.body.purchaseprice;
    const propertycategory = PROPERTY_CATEGORIES[req.body.propertycategory];

    if (!propertycategory) {
        return res.send({success: false, message: "Bad category"});
    }

    db.query(
    'INSERT INTO property (propertyname, propertyowner, city, state, purchaseprice, category, appraisalprice) VALUES (?,?,?,?,?,?,?)',
    [propertyname, propertyowner, city, state, purchaseprice, propertycategory, 10], (err, result) => {
        if (err) {
            console.log(err)
            return res.send({success: false});
        } else {
            res.send({success: true, message: "Property added"});
        }
    });
});

/* Get list of users (restricted) */

app.get("/users", ensureLoggedIn, (req, res) => {
    if (req.user.access != CATEGORY_SUPERUSER) {
        return res.send({success: false, message: "No permissions"});
    }

    db.query("SELECT userid, username, name, lastname, state FROM userinformation WHERE category = 1", [], (err, result) => {
        if (err) {
            console.log(err);
            return res.send({success: false});
        }
        return res.send({success: true, data: result});
    });
});

/* Get Specific Users Properties */

app.get("/properties/:userid", ensureLoggedIn, (req, res) => {
    if (req.user.access != CATEGORY_SUPERUSER) {
        return res.send({success: false, message: "No permissions"});
    }

    db.query("SELECT * FROM property WHERE propertyowner = ?", [req.params.userid], (err, result) => {
        if (err) {
            console.log(err);
            return res.send({success: false});
        }
        return res.send({success: true, data: result});
    });
});

/* Get all properties */

app.get("/allproperties", ensureLoggedIn, (req, res) => {
    if (req.user.access != CATEGORY_SUPERUSER && req.user.access != CATEGORY_GOVERNMENT) {
        return res.send({success: false, message: "No permissions"});
    }

    db.query("SELECT * FROM property", (err, result) => {
        if (err) {
            console.log(err);
            return res.send({success: false});
        }
        res.send({success: true, properties: result});
    });
});

app.get('/properties', ensureLoggedIn, (req, res) => {
    db.query("SELECT * FROM property WHERE propertyowner IN (SELECT userid FROM accountaccess WHERE granted = ?) OR propertyowner = ?",
    [req.user.id, req.user.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send({success: false});
        }
        res.send({success: true, properties: result});
    });
});


app.put('/update', ensureLoggedIn, (req, res) => {
    const propertyid = req.body.id;
    const propertyname = req.body.propertyname;
    console.log(propertyid);
    db.query("UPDATE property SET propertyname = ? WHERE propertyid = ? AND propertyowner = ?",
    [propertyname, propertyid, req.user.id],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.delete('/delete/:id', ensureLoggedIn, (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM property WHERE propertyid = ? AND propertyowner = ?", [id, req.user.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen(3001, () => {
    console.log("The Server is running on Port 3001!")
});

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs')
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const Accommodation = require('./models/Accommodation.js')
const Booking = require ('./models/Booking.js')

require('dotenv').config();
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'd0c38bbcc9556ec18133c7ac36d96d2e';

// const AccommodationRoutes = require('./routes/accommodationsRoutes')
 

//Middlewares
app.use(express.json())
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
});

// verify booking using UserData
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

// 

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

});

//{ samesite: none, secure: true } error
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passverified = bcrypt.compareSync(password, userDoc.password);
        if (passverified) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'none', secure: true }).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).json(true);
});

const photosM = multer({ dest: 'uploads/' });
app.post('/upload-by-link', photosM.array('photos', 100), async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.post('/accommodations', (req, res) => {
    const { token } = req.cookies;
    const { price, title, type, address, addedPhotos, description,
        features, extraInfo, checkIn, checkOut, maxGuests,city
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const accommodationDoc = await Accommodation.create({
            owner: userData.id, price,
            title, type, address, photos: addedPhotos, description,
            features, extraInfo, checkIn, checkOut, maxGuests,city
        })
        res.json(accommodationDoc);
    });
});

//Listed user accommodations 
app.get('/user-accommodations', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Accommodation.find({ owner: id }))
    })
});
//user accommodations by Id
app.get('/accommodations/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Accommodation.findById(id));
});

// update user accommodations by Id
app.put('/accommodations', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, type, addedPhotos, description,city,
        features, extraInfo, checkIn, checkOut, maxGuests, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const accommodationDoc = await Accommodation.findById(id);
        if (userData.id === accommodationDoc.owner.toString()) {
            accommodationDoc.set({
                title, address, type, photos: addedPhotos, description, features, extraInfo, checkIn, checkOut, maxGuests, price,city
            });
            await accommodationDoc.save();
            res.json('ok');
        }
    });
});
//all listed accommodations 
app.get('/accommodations', async (req, res) => {
    res.json(await Accommodation.find())
});


//create booking
app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        accommodation, checkIn, checkOut, numberOfGuests, name, phone, price,city
    } = req.body;
    Booking.create({
        accommodation, checkIn, checkOut, numberOfGuests, name, phone, price,
        user: userData.id,city
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('accommodation'));
});

app.listen(4000, () => console.log("API is working!"));
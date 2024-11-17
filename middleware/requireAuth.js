// const jwt = require('jsonwebtoken');
// const User = require('../models/usermodel');
// const { initializeApp } = require('firebase-admin/app');
// const app = initializeApp();

// const requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status(401).json({ error: 'Authorization token required' });
//     }
//     const token = authorization.split(' ')[1];
//     console.log("Token received:", token);

//     try {
//         getAuth()
//   .verifyIdToken(idToken)
//   .then((decodedToken) => {
//     const uid = decodedToken.uid;
//     req.User = uid;
//     // ...
//   })
//   .catch((error) => {
//     // Handle error
//   });
        
        
//         next();
//     } catch (error) {
//         console.log("JWT verification error:", error);
//         res.status(401).json({ error: 'Request is not authorized' });
//     }
// };

// module.exports = requireAuth;

const { getAuth } = require('firebase-admin/auth');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const admin = require('firebase-admin');
const path = require('path');

// Provide the path to the service account key JSON file
const serviceAccount = require(path.join(__dirname, './blogs-f7323-firebase-adminsdk-hhaj7-ea199593f2.json'));

initializeApp({
  credential: cert(serviceAccount),
});

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    console.log("Token received:", token);

    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        console.log(decodedToken.uid);
        req.user = decodedToken.uid; // Assign the user ID to req.user

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("JWT verification error:", error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;

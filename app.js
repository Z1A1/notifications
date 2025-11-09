const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());

// === Initialize Firebase Admin SDK ===
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Optional: Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Add document to 'users' collection
    const docRef = await db.collection('users').add({
      name,
      email,
   
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({
      message: 'User added successfully!',
      id: docRef.id
    });

  } catch (error) {
    console.error('Error writing to Firestore:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});
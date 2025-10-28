const express = require('express');
const app = express();
const db = require('./models');
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ 
    extended: true
 }));

 app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

db.sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    }
);

app.get('/komik', async (req, res) => {
    try {
        const komiks = await db.Komik.findAll();
        res.send(komiks);
    } catch (error) {
        res.send(err);
    }
});

app.post
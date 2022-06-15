const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./Config/db.config');
const cors = require('cors');
require('express-group-routes');


const user_routes = require('./Routes/user');

const app = express();

app.use(express.static(__dirname+'/public/'));


app.use(bodyParser.json())
app.use(cors());

DB.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
  });

app.group("/api/v1/auth", (router) => {
    router.use('/users', user_routes);
    // router.use('/test', routes)
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀`);
})
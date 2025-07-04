const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const cors = require('cors');   
const { sequelize } = require('./models');
const User = require('./models/User');
const Event = require('./models/Event');
const Log = require('./models/Log');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5500',    
  credentials: true                   
}));

User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });



app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'segredo_super_secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: 'lax' }
}));

app.use('/api', router);

sequelize.sync({ alter: true }).then(() => {
  console.log('Banco sincronizado');
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
const app = require('./app');

require('dotenv').config();

const PORT = process.env.APP_PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
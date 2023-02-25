
const PORT = 3000;
const server = require('./index');
const { db } = require('./db');

db.sync().then(() => {
  server.listen(PORT, () =>
    console.log(`
        Listening on port ${PORT}
        http://localhost:${PORT}/
    `)
  );
});

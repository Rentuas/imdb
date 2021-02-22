const app = require('./src/server');

const { SERVER_PORT, mode } = require('./src/config/env');

const port = process.env.PORT || SERVER_PORT || 5050;

app.listen({ port }, () => {
  console.log(`
    MODE:${mode}
    Server ready at http://localhost:${port}
  `);
});

const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults({
  static: "./public",
});

const PORT = process.env.PORT || 3000;

/**
 * Middlewares
 */
server.use(middlewares);
server.use(jsonServer.bodyParser);

/**
 * Custom Headers
 */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

/**
 * Health Check Route
 */
server.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "JSON Server running",
  });
});

/**
 * API Routes
 */
server.use(router);

/**
 * Start Server
 */
server.listen(PORT, () => {
  console.log(
    `🚀 JSON Server running on port ${PORT}`
  );
});
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "quantified_shelf_development",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "quantified_shelf_test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "quantified_shelf_production",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false,
    use_env_variable: "DATABASE_URL"
  }
}

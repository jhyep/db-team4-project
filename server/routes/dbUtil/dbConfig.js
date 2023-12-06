// Oracle DB 설정

module.exports = {
  user: process.env.NODE_ORALCEDB_USER || "book",
  password: process.env.NODE_ORALCEDB_PASSWORD || "comp322",
  connectString:
    process.env.NODE_ORALCEDB_CONNECTIONSTRING || "localhost:1521/orcl",
  externalAuth: process.env.NODE_ORALCEDB_EXTERNALAUTH ? true : false,
};

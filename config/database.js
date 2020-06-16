module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'strapi-db-test.c1pepknp2zc6.ap-south-1.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'dhpQjS42AQJqENvS4HthKF682VpV'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});

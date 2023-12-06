\echo 'Delete and recreate dfacdash db?'
\prompt 'Return for yes or control-C to cancel > '

DROP DATABASE dfacdash;
CREATE DATABASE dfacdash;

\connect dfacdash

\i database.sql
\i seed.sql
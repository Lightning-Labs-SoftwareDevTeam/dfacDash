\echo 'Delete and recreate dfacdash db?'
\prompt 'Return for yes or control-C to cancel > ' pauseB4DROPdb

DROP DATABASE dfacdash;
CREATE DATABASE dfacdash;

\c dfacdash

\i database.sql
\i seed.sql

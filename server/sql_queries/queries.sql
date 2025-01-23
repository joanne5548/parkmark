-- Show timezone names supported by Postgres
SELECT
    name,
    abbrev,
    utc_offset,
    is_dst
FROM pg_timezone_names
WHERE utc_offset='00:00:00';

-- Set Postgres database timezone
SET timezone = 'UTC';

-- Check & Change server/client encoding
SHOW server_encoding;
SHOW client_encoding;
SET client_encoding TO 'UTF8';

INSERT INTO NationalPark(name, park_info) VALUES(
    'Joanne''s national park :D',
    '{"favorite color": "Blue"}'
);
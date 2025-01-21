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

INSERT INTO NationalPark(name, park_info) VALUES(
    'Joanne''s national park :D',
    '{"favorite color": "Blue"}'
);
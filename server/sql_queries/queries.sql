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

-- Change from image list to 1 image url
ALTER TABLE Review RENAME img_url_list TO img_url;
ALTER TABLE Review ALTER COLUMN img_url TYPE VARCHAR(255);

-- Return reviews by most recent to oldest
SELECT * FROM review ORDER BY created_at DESC;

-- Set default for img_url to null
ALTER TABLE Review ALTER COLUMN img_url SET DEFAULT NULL;

INSERT INTO NationalPark(name, park_info) VALUES(
    'Joanne''s national park :D',
    '{"favorite color": "Blue"}'
);

-- We're spending time dealing with images AGAIN...
-- We will use a separate table for images. So
-- 1) Create the ReviewImage table
-- 2) Get all reviews from Review table and insert into ReviewImage
-- 3) Drop img_url column in Review table
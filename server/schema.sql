CREATE TABLE UserData(
    sub_id INTEGER PRIMARY KEY, /* Google's unique ID given to each user */
    name VARCHAR(255),
    email VARCHAR(255),
    profile_picture_url VARCHAR(255),
    created_at timestamp with time zone
);

INSERT INTO UserData(sub_id, name, email, profile_picture_url, created_at) VALUES(12345678, 'Joanne Kim', 'email@domain.com', 'https://url/example', '2004-10-19 10:23:54+02');

CREATE TABLE Review (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES UserData(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    park_id UUID REFERENCES NationalPark(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at timestamp with time zone,
    content VARCHAR(2048),
    img_url_list JSONB
);

CREATE TABLE ThumbsUpList (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES UserData(id),
    review_id UUID REFERENCES Review(id)
);

CREATE TABLE NationalPark (
    id UUID,
    name VARCHAR(255),
    park_info JSONB
);

SET timezone = 'America/New_York';
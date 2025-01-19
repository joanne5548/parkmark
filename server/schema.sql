CREATE TABLE UserData(
    sub_id VARCHAR(255) PRIMARY KEY, /* Google's unique ID given to each user */
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    profile_picture_url VARCHAR(255),
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Review (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES UserData(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    park_id UUID REFERENCES NationalPark(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at timestamptz,
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
CREATE TABLE UserData(
    sub_id VARCHAR(255) PRIMARY KEY, /* Google's unique ID given to each user */
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    profile_picture_url VARCHAR(255),
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Postgres gen_random_uuid produces version 4 UUID
CREATE TABLE NationalPark (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    park_info JSONB NOT NULL
);

CREATE TABLE Review (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_sub_id VARCHAR(255) REFERENCES UserData(sub_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    park_id UUID REFERENCES NationalPark(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content VARCHAR(2048),
    img_url_list JSONB DEFAULT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ThumbsUpList (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_sub_id VARCHAR(255) REFERENCES UserData(sub_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE, -- hmm is this a good idea
    review_id UUID REFERENCES Review(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
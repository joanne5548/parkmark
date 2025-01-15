CREATE TABLE User(
    id CHAR(36) PRIMARY KEY,
    refreshToken VARCHAR(512)
);

CREATE TABLE Review (
    id CHAR(36) PRIMARY KEY,
    userId CHAR(36) REFERENCES User(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    parkID CHAR(36) REFERENCES NationalPark(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5),
    date DATE,
    content VARCHAR(512),
    imgList JSONB
);

CREATE TABLE ThumbsUpList (
    id?
    userId CHAR(36) REFERENCES User(id),
    reviewId CHAR(36) REFERENCES Review(id)
);

CREATE TABLE NationalPark (
    id CHAR(36),
    name VARCHAR(255),
    parkInfo JSONB
);
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_number VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE schedule(
    schedule_id uuid UNIQUE DEFAULT uuid_generate_v4(),
    schedule_time TIME NOT NULL,
    schedule_day VARCHAR(255) NOT NULL,
    PRIMARY KEY(schedule_id, schedule_time, schedule_day)
);

INSERT INTO
    schedule (schedule_time, schedule_day)
VALUES
    ('8:00:00', 'Thursday');

CREATE TABLE registration(
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    schedule_id uuid REFERENCES schedule(schedule_id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, schedule_id)
);
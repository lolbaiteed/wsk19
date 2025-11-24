-- CreateTable
CREATE TABLE `attendees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `registration_code` VARCHAR(6) NOT NULL,
    `login_token` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,

    INDEX `fk_channels_events1_idx`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_tickets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `cost` DECIMAL(9, 2) NULL,
    `special_validity` VARCHAR(255) NULL,

    INDEX `fk_tickets_events_idx`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organizer_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `slug` VARCHAR(45) NULL,
    `date` DATE NULL,

    INDEX `fk_events_organizers1_idx`(`organizer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `slug` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NULL,
    `password_hash` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendee_id` INTEGER NOT NULL,
    `ticket_id` INTEGER NOT NULL,
    `registration_time` DATETIME(0) NULL,

    INDEX `fk_registrations_attendees1_idx`(`attendee_id`),
    INDEX `fk_registrations_tickets1_idx`(`ticket_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `channel_id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `capacity` INTEGER NULL,

    INDEX `fk_rooms_channels1_idx`(`channel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_registrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registration_id` INTEGER NOT NULL,
    `session_id` INTEGER NOT NULL,

    INDEX `fk_registrations_has_sessions_registrations1_idx`(`registration_id`),
    INDEX `fk_registrations_has_sessions_sessions1_idx`(`session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `speaker` VARCHAR(45) NULL,
    `start` DATETIME(0) NOT NULL,
    `end` DATETIME(0) NOT NULL,
    `type` ENUM('talk', 'workshop') NOT NULL,
    `cost` DECIMAL(9, 2) NULL,

    INDEX `fk_sessions_rooms1_idx`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `channels` ADD CONSTRAINT `fk_channels_events1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event_tickets` ADD CONSTRAINT `fk_tickets_events` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `fk_events_organizers1` FOREIGN KEY (`organizer_id`) REFERENCES `organizers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `fk_registrations_attendees1` FOREIGN KEY (`attendee_id`) REFERENCES `attendees`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `registrations` ADD CONSTRAINT `fk_registrations_tickets1` FOREIGN KEY (`ticket_id`) REFERENCES `event_tickets`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `fk_rooms_channels1` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session_registrations` ADD CONSTRAINT `fk_registrations_has_sessions_registrations1` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session_registrations` ADD CONSTRAINT `fk_registrations_has_sessions_sessions1` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `fk_sessions_rooms1` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


-- Create the database if it doesn't exist
-- Note: Your MySQL user needs privileges to create databases.
-- Alternatively, create the database manually before running the script.
-- CREATE DATABASE IF NOT EXISTS campus_connect_db;

-- Use the database
-- USE campus_connect_db;

-- Table structure for table `students`
-- Stores information about current students
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  `year` int NOT NULL COMMENT 'Current year of study (e.g., 1, 2, 3, 4)',
  `image` varchar(512) DEFAULT NULL COMMENT 'URL to the student''s photo',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_student_name` (`name`) -- Index for faster name lookups
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores current student records';

-- Insert some sample student data (optional)
INSERT INTO `students` (`name`, `major`, `year`, `image`) VALUES
('Grace Hall', 'Computer Science', 3, 'https://picsum.photos/seed/student1/100/100'),
('Henry Adams', 'Mechanical Engineering', 2, 'https://picsum.photos/seed/student2/100/100'),
('Isabella Scott', 'Business Administration', 4, 'https://picsum.photos/seed/student3/100/100'),
('Jack King', 'Psychology', 1, 'https://picsum.photos/seed/student4/100/100'),
('Katherine Baker', 'Art History', 3, 'https://picsum.photos/seed/student5/100/100'),
('Liam Evans', 'Physics', 2, 'https://picsum.photos/seed/student6/100/100'),
('Mia Collins', 'Nursing', 4, 'https://picsum.photos/seed/student7/100/100'),
('Noah Stewart', 'Political Science', 1, 'https://picsum.photos/seed/student8/100/100');


-- Table structure for table `alumni`
-- Stores information submitted through the alumni registration form
DROP TABLE IF EXISTS `alumni`;
CREATE TABLE `alumni` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `graduationYear` int NOT NULL,
  `major` varchar(255) NOT NULL,
  `currentOccupation` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_alumni_email` (`email`) COMMENT 'Ensure email addresses are unique'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores alumni registration records';

-- Add more tables as needed (e.g., teachers, notifications, photos)

-- Example for teachers table (adjust columns as needed)
/*
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `image` varchar(512) DEFAULT NULL COMMENT 'URL to the teacher''s photo',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_teacher_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Stores teacher records';

INSERT INTO `teachers` (`name`, `subject`, `image`) VALUES
('Dr. Alice Smith', 'Mathematics', 'https://picsum.photos/seed/teacher1/100/100'),
('Mr. Bob Johnson', 'Physics', 'https://picsum.photos/seed/teacher2/100/100'),
('Ms. Carol Williams', 'Chemistry', 'https://picsum.photos/seed/teacher3/100/100'),
('Dr. David Brown', 'Biology', 'https://picsum.photos/seed/teacher4/100/100'),
('Mrs. Emily Davis', 'English Literature', 'https://picsum.photos/seed/teacher5/100/100'),
('Prof. Frank Miller', 'History', 'https://picsum.photos/seed/teacher6/100/100');
*/

-- Remember to configure your .env file with the correct database credentials.
-- You can run this script using a MySQL client like MySQL Workbench, DBeaver, or the command line:
-- mysql -u your_mysql_user -p your_database_name < scripts/init-db.sql
-- Make sure the database 'campus_connect_db' (or your chosen name) exists first.

SELECT 'Database initialization script completed.' AS Status;

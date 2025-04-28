
import type { Student, StudentInput } from '@/types/student';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Fetches all students from the database.
 * @returns {Promise<Student[]>} A promise that resolves to an array of students.
 */
export async function getStudents(): Promise<Student[]> {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT id, name, major, year, image FROM students ORDER BY name ASC'
    );
    // Cast the generic RowDataPacket[] to Student[]
    // Ensure your database column names match the Student interface properties
    return rows as Student[];
  } catch (error) {
    console.error('Database error fetching students:', error);
    // Depending on requirements, you might return [] or throw the error
    throw new Error('Failed to fetch students from database.');
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Adds a new student record to the database.
 * Note: Image handling is simplified. Assumes `image` is a URL/path or null.
 * @param {StudentInput} studentData - The data for the new student record.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly inserted student record.
 */
export async function addStudent(studentData: StudentInput): Promise<number> {
  const { name, major, year, image } = studentData;

  // Basic validation (more comprehensive validation might be in the calling action/API route)
  if (!name || !major || !year) {
    throw new Error('Missing required student fields (name, major, year).');
  }
  if (typeof year !== 'number' || !Number.isInteger(year) || year < 1) {
     throw new Error('Invalid year provided. Must be a positive integer.');
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO students (name, major, year, image) VALUES (?, ?, ?, ?)',
      [name, major, year, image ?? null] // Use null if image is not provided or undefined
    );

    if (result.insertId) {
      return result.insertId;
    } else {
      throw new Error('Failed to insert student record, no insertId returned.');
    }
  } catch (error) {
    console.error('Database error adding student:', error);
    if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
       // Customize based on unique constraints (e.g., student ID or email if added)
       throw new Error('A student with similar details might already exist.');
    }
     // Re-throw a more specific error or a generic one
    throw new Error('Failed to add student to database.');
  } finally {
     if (connection) {
        connection.release();
     }
  }
}


// Potential future functions:
// export async function getStudentById(id: number): Promise<Student | null> { ... }
// export async function updateStudent(id: number, studentData: Partial<StudentInput>): Promise<boolean> { ... }
// export async function deleteStudent(id: number): Promise<boolean> { ... }


import type { Teacher, TeacherInput } from '@/types/teacher';
import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Adds a new teacher record to the database.
 * Note: Image handling (uploading and storing the URL/path) is simplified here.
 *       This function expects an image URL or null.
 * @param {TeacherInput} teacherData - The data for the new teacher record.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly inserted teacher record.
 */
export async function addTeacher(teacherData: TeacherInput): Promise<number> {
  const { name, subject, image } = teacherData;

  if (!name || !subject) {
    throw new Error('Missing required teacher fields (name, subject).');
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO teachers (name, subject, image) VALUES (?, ?, ?)',
      [name, subject, image ?? null] // Use null if image is not provided or undefined
    );

    if (result.insertId) {
      return result.insertId;
    } else {
      throw new Error('Failed to insert teacher record, no insertId returned.');
    }
  } catch (error) {
    console.error('Database error adding teacher:', error);
    // Check for specific errors if needed, e.g., duplicate entries based on name/subject?
    if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        // Customize based on your unique constraints
        throw new Error('A teacher with similar details might already exist.');
    }
    // Re-throw a more specific error or a generic one
    throw new Error('Failed to add teacher to database.');
  } finally {
    // Ensure the connection is always released back to the pool
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Fetches all teachers from the database.
 * @returns {Promise<Teacher[]>} A promise that resolves to an array of teachers.
 */
export async function getTeachers(): Promise<Teacher[]> {
  let connection;
  try {
     connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT id, name, subject, image FROM teachers ORDER BY name ASC'
    );
    // Directly cast because the query selects the exact fields of the Teacher interface.
    // Add validation/transformation if DB schema differs significantly.
    return rows as Teacher[];
  } catch (error) {
    console.error('Database error fetching teachers:', error);
    // Depending on requirements, you might return [] or throw the error
    throw new Error('Failed to fetch teachers from database.');
  } finally {
     if (connection) {
       connection.release();
     }
  }
}

// Potential future functions:
// export async function getTeacherById(id: number): Promise<Teacher | null> { ... }
// export async function updateTeacher(id: number, teacherData: Partial<TeacherInput>): Promise<boolean> { ... }
// export async function deleteTeacher(id: number): Promise<boolean> { ... }

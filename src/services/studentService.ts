
import type { Student } from '@/types/student';
import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

/**
 * Fetches all students from the database.
 * @returns {Promise<Student[]>} A promise that resolves to an array of students.
 */
export async function getStudents(): Promise<Student[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, major, year, image FROM students ORDER BY name ASC'
    );
    // Cast the generic RowDataPacket[] to Student[]
    // Ensure your database column names match the Student interface properties
    return rows as Student[];
  } catch (error) {
    console.error('Error fetching students:', error);
    // In a real app, you might want to throw a custom error or return an empty array
    // depending on how you want the UI to handle DB errors.
    throw new Error('Failed to fetch students from database.');
  }
}

// Potential future functions:
// export async function getStudentById(id: number): Promise<Student | null> { ... }
// export async function addStudent(studentData: Omit<Student, 'id'>): Promise<number> { ... } // Returns new student ID
// export async function updateStudent(id: number, studentData: Partial<Student>): Promise<boolean> { ... }
// export async function deleteStudent(id: number): Promise<boolean> { ... }

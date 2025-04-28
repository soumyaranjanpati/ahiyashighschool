
import type { AlumniInput, Alumni } from '@/types/alumni';
import pool from '@/lib/db';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

/**
 * Adds a new alumni record to the database.
 * @param {AlumniInput} alumniData - The data for the new alumni record.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly inserted alumni record.
 */
export async function addAlumni(alumniData: AlumniInput): Promise<number> {
  const {
    fullName,
    email,
    graduationYear,
    major,
    currentOccupation,
    message,
  } = alumniData;

  // Basic validation (more robust validation happens via Zod in the API route/action)
  if (!fullName || !email || !graduationYear || !major) {
    throw new Error('Missing required alumni fields.');
  }
  if (typeof graduationYear !== 'number' || !Number.isInteger(graduationYear)) {
      throw new Error('Graduation year must be a valid number.');
  }


  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO alumni (fullName, email, graduationYear, major, currentOccupation, message) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName, email, graduationYear, major, currentOccupation ?? null, message ?? null]
    );

    if (result.insertId) {
      return result.insertId;
    } else {
      throw new Error('Failed to insert alumni record, no insertId returned.');
    }
  } catch (error) {
    console.error('Database error adding alumni:', error);
    // Check for unique constraint violation (e.g., duplicate email)
    if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        // Check constraints defined in your DB schema
        if (error.message.includes('email')) { // Example check
             throw new Error('An alumnus with this email address is already registered.');
        }
        throw new Error('Duplicate entry detected.'); // Generic duplicate message
    }
    // Re-throw a generic error for other issues
    throw new Error('Failed to add alumni to database.');
  } finally {
      if (connection) {
        connection.release();
      }
  }
}

/**
 * Fetches all alumni records from the database.
 * @returns {Promise<Alumni[]>} A promise that resolves to an array of alumni records.
 */
export async function getAlumni(): Promise<Alumni[]> {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, fullName, email, graduationYear, major, currentOccupation, message, createdAt FROM alumni ORDER BY createdAt DESC'
        );
        // Ensure field names match the Alumni interface
        return rows as Alumni[];
    } catch (error) {
        console.error('Database error fetching alumni:', error);
        throw new Error('Failed to fetch alumni from database.');
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// Potential future functions:
// export async function getAlumniById(id: number): Promise<Alumni | null> { ... }
// export async function updateAlumni(id: number, alumniData: Partial<AlumniInput>): Promise<boolean> { ... }
// export async function deleteAlumni(id: number): Promise<boolean> { ... }


import type { AlumniInput } from '@/types/alumni';
import pool from '@/lib/db';
import type { ResultSetHeader } from 'mysql2';

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

  // Basic validation (more robust validation happens via Zod in the form)
  if (!fullName || !email || !graduationYear || !major) {
    throw new Error('Missing required alumni fields.');
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO alumni (fullName, email, graduationYear, major, currentOccupation, message) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName, email, graduationYear, major, currentOccupation ?? null, message ?? null]
    );

    if (result.insertId) {
      return result.insertId;
    } else {
      throw new Error('Failed to insert alumni record, no insertId returned.');
    }
  } catch (error) {
    console.error('Error adding alumni:', error);
    // Check for unique constraint violation (e.g., duplicate email)
    if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        throw new Error('An alumnus with this email address is already registered.');
    }
    // Re-throw a generic error for other issues
    throw new Error('Failed to add alumni to database.');
  }
}

// Potential future functions:
// export async function getAlumni(): Promise<Alumni[]> { ... }
// export async function getAlumniById(id: number): Promise<Alumni | null> { ... }
// export async function updateAlumni(id: number, alumniData: Partial<AlumniInput>): Promise<boolean> { ... }
// export async function deleteAlumni(id: number): Promise<boolean> { ... }

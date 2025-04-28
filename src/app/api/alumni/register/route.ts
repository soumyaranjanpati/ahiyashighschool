// src/app/api/alumni/register/route.ts
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { addAlumni } from '@/services/alumniService'; // Ensure this uses the DB pool correctly
import type { AlumniInput } from '@/types/alumni';

// Define the schema matching the form validation schema
const alumniFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  graduationYear: z.coerce
    .number({ invalid_type_error: "Graduation year must be a number."})
    .int()
    .min(1900, { message: 'Graduation year seems too old.' })
    .max(new Date().getFullYear(), { message: 'Graduation year cannot be in the future.' }),
  major: z.string().min(2, { message: 'Major must be at least 2 characters.' }),
  currentOccupation: z.string().optional(),
  message: z.string().max(500, { message: 'Message cannot exceed 500 characters.' }).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsedData = alumniFormSchema.safeParse(json);

    if (!parsedData.success) {
      // Collect validation errors
      const errors = parsedData.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      // Return the first validation error message for simplicity in the toast
      const firstErrorMessage = errors[0]?.message || 'Validation failed.';
      return NextResponse.json({ error: firstErrorMessage, details: errors }, { status: 400 });
    }

    // Type assertion is safe here due to successful parsing
    const alumniData: AlumniInput = parsedData.data as AlumniInput;

    // Call the service to add the alumni to the database
    const newAlumniId = await addAlumni(alumniData);

    // On success, return a success message and the ID
    return NextResponse.json({ message: 'Alumni registered successfully!', id: newAlumniId }, { status: 201 });

  } catch (error: unknown) {
    console.error('API Error adding alumni:', error);

    // Handle specific known errors from the service layer
    if (error instanceof Error) {
        // Check for duplicate entry error message (adjust based on your service error message)
        if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('duplicate entry')) {
            return NextResponse.json({ error: error.message }, { status: 409 }); // Conflict
        }
         // Check for missing fields error (should ideally be caught by Zod, but as a fallback)
         if (error.message.includes('Missing required')) {
            return NextResponse.json({ error: error.message }, { status: 400 }); // Bad Request
        }
         // Handle other database or service errors
         return NextResponse.json({ error: 'Failed to register alumni due to a server issue.' }, { status: 500 });
    }

    // Generic internal server error for unknown errors
    return NextResponse.json({ error: 'An unexpected internal server error occurred.' }, { status: 500 });
  }
}

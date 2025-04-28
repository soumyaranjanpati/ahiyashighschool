
// src/app/api/alumni/register/route.ts
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { addAlumni } from '@/services/alumniService';
import type { AlumniInput } from '@/types/alumni';

// Define the schema matching the form validation schema
const alumniFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  graduationYear: z.coerce
    .number()
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
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    const alumniData: AlumniInput = parsedData.data;

    // Call the service to add the alumni to the database
    const newAlumniId = await addAlumni(alumniData);

    return NextResponse.json({ message: 'Alumni registered successfully!', id: newAlumniId }, { status: 201 });

  } catch (error: unknown) {
    console.error('API Error adding alumni:', error);

    // Handle specific known errors from the service
    if (error instanceof Error) {
        if (error.message.includes('already registered')) {
            return NextResponse.json({ error: error.message }, { status: 409 }); // Conflict
        }
         if (error.message.includes('Missing required')) {
            return NextResponse.json({ error: error.message }, { status: 400 }); // Bad Request
        }
    }

    // Generic internal server error for other cases
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

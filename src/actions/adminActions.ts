
// src/actions/adminActions.ts
'use server'; // Mark this file as Server Actions

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addTeacher } from '@/services/teacherService';
import { addStudent } from '@/services/studentService';
import type { TeacherInput } from '@/types/teacher';
import type { StudentInput } from '@/types/student';

// --- Teacher Action ---

export interface TeacherActionState {
  message: string;
  status: 'idle' | 'success' | 'error';
  teacherName?: string; // Optionally return data on success
}

const teacherSchema = z.object({
  teacherName: z.string().min(2, { message: 'Teacher name must be at least 2 characters.' }),
  teacherSubject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
  // Image handling is complex with Server Actions FormData, omitted for simplicity here
  // teacherImage: z.string().optional(), // Assuming URL is handled elsewhere or not implemented yet
});

export async function handleAddTeacherAction(
  prevState: TeacherActionState,
  formData: FormData,
): Promise<TeacherActionState> {
  const validatedFields = teacherSchema.safeParse({
    teacherName: formData.get('teacherName'),
    teacherSubject: formData.get('teacherSubject'),
    // teacherImage: formData.get('teacherImage'), // If handling image URL string
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.teacherName?.[0]
            || validatedFields.error.flatten().fieldErrors.teacherSubject?.[0]
            || 'Validation failed.',
      status: 'error',
    };
  }

  const { teacherName, teacherSubject } = validatedFields.data;

  const teacherData: TeacherInput = {
    name: teacherName,
    subject: teacherSubject,
    // image: teacherImage || null, // Use null if optional/not provided
    image: null, // Hardcoding null as image upload isn't handled here
  };

  try {
    const newTeacherId = await addTeacher(teacherData);
    revalidatePath('/teachers'); // Revalidate the teachers page cache
    revalidatePath('/admin'); // Revalidate admin page if needed
    return {
      message: `Teacher '${teacherName}' added successfully with ID ${newTeacherId}.`,
      status: 'success',
      teacherName: teacherName,
    };
  } catch (error: any) {
    console.error("Server Action Error adding teacher:", error);
    return {
      message: error.message || 'Failed to add teacher.',
      status: 'error',
    };
  }
}


// --- Student Action ---

export interface StudentActionState {
  message: string;
  status: 'idle' | 'success' | 'error';
  studentName?: string;
}

const studentSchema = z.object({
  studentName: z.string().min(2, { message: 'Student name must be at least 2 characters.' }),
  studentMajor: z.string().min(2, { message: 'Major must be at least 2 characters.' }),
  studentYear: z.coerce // Use coerce for automatic conversion from string
    .number({ invalid_type_error: 'Year must be a number.' })
    .int({ message: 'Year must be a whole number.' })
    .min(1, { message: 'Year must be at least 1.' }),
  // studentImage: z.string().optional(),
});

export async function handleAddStudentAction(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {

  const validatedFields = studentSchema.safeParse({
    studentName: formData.get('studentName'),
    studentMajor: formData.get('studentMajor'),
    studentYear: formData.get('studentYear'),
    // studentImage: formData.get('studentImage'),
  });

  if (!validatedFields.success) {
    // Concisely get the first error message
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Validation failed.',
      status: 'error',
    };
  }

   const { studentName, studentMajor, studentYear } = validatedFields.data;

  const studentData: StudentInput = {
    name: studentName,
    major: studentMajor,
    year: studentYear,
    // image: studentImage || null,
    image: null, // Hardcoding null as image upload isn't handled here
  };

  try {
    const newStudentId = await addStudent(studentData);
    revalidatePath('/students'); // Revalidate the students page cache
    revalidatePath('/admin');
    return {
      message: `Student '${studentName}' added successfully with ID ${newStudentId}.`,
      status: 'success',
      studentName: studentName,
    };
  } catch (error: any) {
     console.error("Server Action Error adding student:", error);
    return {
      message: error.message || 'Failed to add student.',
      status: 'error',
    };
  }
}

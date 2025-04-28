
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  image?: string | null; // Image URL, optional
  // Add any other relevant teacher fields
}

// Type for data being inserted (matches form values)
export interface TeacherInput {
  name: string;
  subject: string;
  image?: string | null; // Store image URL or path
}

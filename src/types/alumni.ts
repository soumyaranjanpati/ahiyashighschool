
export interface Alumni {
  id: number;
  fullName: string;
  email: string;
  graduationYear: number;
  major: string;
  currentOccupation?: string | null;
  message?: string | null;
  createdAt: Date | string; // string if fetched directly from DB, Date otherwise
}

// Type for data being inserted (matches form values)
export interface AlumniInput {
  fullName: string;
  email: string;
  graduationYear: number;
  major: string;
  currentOccupation?: string;
  message?: string;
}


// Make this a Server Component to fetch data on the server
// Remove 'use client' directive if present

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GraduationCap, AlertTriangle } from 'lucide-react';
import { getStudents } from '@/services/studentService'; // Import the service
import type { Student } from '@/types/student'; // Import the type

export default async function StudentsPage() {
  let students: Student[] = [];
  let fetchError: string | null = null;

  try {
    students = await getStudents();
  } catch (error) {
    console.error("Failed to load students:", error);
    fetchError = "Could not load student data at this time. Please try again later.";
    // Assign an empty array in case of error to prevent map issues
    students = [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <GraduationCap className="text-primary" /> Students Directory
      </h1>
      <p className="text-muted-foreground">
        Connect with current students across various disciplines.
      </p>

      {fetchError && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle /> Data Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{fetchError}</p>
          </CardContent>
        </Card>
      )}

      {!fetchError && students.length === 0 && (
         <Card>
           <CardHeader>
             <CardTitle>No Students Found</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">There are currently no students listed in the directory.</p>
           </CardContent>
         </Card>
       )}


      {!fetchError && students.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader className="flex flex-row items-center gap-4 p-4 bg-secondary/50">
                <Avatar className="h-16 w-16">
                  {/* Use optional chaining and provide a default empty string */}
                  <AvatarImage src={student.image ?? undefined} alt={student.name} />
                  <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.major}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm">Year: {student.year}</p>
                <p className="text-xs text-muted-foreground pt-1">
                  Student ID: S-{String(student.id).padStart(5, '0')}
                </p>
                {/* Add more student details here if needed */}
              </CardContent>
            </Card>
          ))}
        </div>
       )}
    </div>
  );
}

// Ensure the fade-in animation is defined in globals.css or tailwind.config.js
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
}
*/

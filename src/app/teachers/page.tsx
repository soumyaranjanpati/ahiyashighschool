
// Make this a Server Component to fetch data on the server
// Remove 'use client' directive if present

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, AlertTriangle } from 'lucide-react'; // Import AlertTriangle
import { getTeachers } from '@/services/teacherService'; // Import the service
import type { Teacher } from '@/types/teacher'; // Import the type

export default async function TeachersPage() {
  let teachers: Teacher[] = [];
  let fetchError: string | null = null;

  try {
    teachers = await getTeachers();
  } catch (error) {
    console.error("Failed to load teachers:", error);
    fetchError = "Could not load teacher data at this time. Please try again later.";
    // Assign an empty array in case of error to prevent map issues
    teachers = [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="text-primary"/> Teachers Directory</h1>
      <p className="text-muted-foreground">Meet our dedicated faculty members.</p>

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

      {!fetchError && teachers.length === 0 && (
         <Card>
           <CardHeader>
             <CardTitle>No Teachers Found</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">There are currently no teachers listed in the directory. Admins can add teachers via the Admin Panel.</p>
           </CardContent>
         </Card>
       )}

      {!fetchError && teachers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardHeader className="flex flex-row items-center gap-4 p-4 bg-secondary/50">
                <Avatar className="h-16 w-16">
                   {/* Use optional chaining and provide a default empty string */}
                  <AvatarImage src={teacher.image ?? undefined} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Add more teacher details here if needed */}
                <p className="text-xs text-muted-foreground">Faculty ID: T-{String(teacher.id).padStart(4, '0')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Add this to globals.css if not already present for the animation
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

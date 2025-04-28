import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GraduationCap } from 'lucide-react';

// Mock data for students - replace with actual data fetching later
const students = [
  { id: 101, name: 'Grace Hall', major: 'Computer Science', year: 3, image: 'https://picsum.photos/seed/student1/100/100' },
  { id: 102, name: 'Henry Adams', major: 'Mechanical Engineering', year: 2, image: 'https://picsum.photos/seed/student2/100/100' },
  { id: 103, name: 'Isabella Scott', major: 'Business Administration', year: 4, image: 'https://picsum.photos/seed/student3/100/100' },
  { id: 104, name: 'Jack King', major: 'Psychology', year: 1, image: 'https://picsum.photos/seed/student4/100/100' },
  { id: 105, name: 'Katherine Baker', major: 'Art History', year: 3, image: 'https://picsum.photos/seed/student5/100/100' },
  { id: 106, name: 'Liam Evans', major: 'Physics', year: 2, image: 'https://picsum.photos/seed/student6/100/100' },
  { id: 107, name: 'Mia Collins', major: 'Nursing', year: 4, image: 'https://picsum.photos/seed/student7/100/100' },
  { id: 108, name: 'Noah Stewart', major: 'Political Science', year: 1, image: 'https://picsum.photos/seed/student8/100/100' },
];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2"><GraduationCap className="text-primary"/> Students Directory</h1>
      <p className="text-muted-foreground">Connect with current students across various disciplines.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="flex flex-row items-center gap-4 p-4 bg-secondary/50">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{student.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{student.major}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm">Year: {student.year}</p>
               <p className="text-xs text-muted-foreground pt-1">Student ID: S-{String(student.id).padStart(5, '0')}</p>
              {/* Add more student details here if needed */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Add this to globals.css if not already added from teachers page
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

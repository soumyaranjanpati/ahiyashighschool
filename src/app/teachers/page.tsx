import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

// Mock data for teachers - replace with actual data fetching later
const teachers = [
  { id: 1, name: 'Dr. Alice Smith', subject: 'Mathematics', image: 'https://picsum.photos/seed/teacher1/100/100' },
  { id: 2, name: 'Mr. Bob Johnson', subject: 'Physics', image: 'https://picsum.photos/seed/teacher2/100/100' },
  { id: 3, name: 'Ms. Carol Williams', subject: 'Chemistry', image: 'https://picsum.photos/seed/teacher3/100/100' },
  { id: 4, name: 'Dr. David Brown', subject: 'Biology', image: 'https://picsum.photos/seed/teacher4/100/100' },
  { id: 5, name: 'Mrs. Emily Davis', subject: 'English Literature', image: 'https://picsum.photos/seed/teacher5/100/100' },
   { id: 6, name: 'Prof. Frank Miller', subject: 'History', image: 'https://picsum.photos/seed/teacher6/100/100' },
];

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="text-primary"/> Teachers Directory</h1>
      <p className="text-muted-foreground">Meet our dedicated faculty members.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="flex flex-row items-center gap-4 p-4 bg-secondary/50">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacher.image} alt={teacher.name} />
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
    </div>
  );
}

// Add simple fade-in animation
// Update globals.css if needed, or use tailwind-animate directly
// Example (add to globals.css or tailwind.config.js):
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
*/
// In tailwind.config.ts add under keyframes:
/*
'fade-in': {
  '0%': { opacity: '0', transform: 'translateY(10px)' },
  '100%': { opacity: '1', transform: 'translateY(0)' },
},
*/
// and under animation:
/*
'fade-in': 'fade-in 0.5s ease-out forwards',
*/

// Add this to globals.css
/*
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
}
*/


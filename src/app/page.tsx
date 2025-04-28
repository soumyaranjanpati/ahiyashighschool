
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { Users, GraduationCap, FileText, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Add High School Image */}
      <div className="w-full max-w-5xl mb-8 overflow-hidden rounded-lg shadow-lg">
        <Image
          src="https://picsum.photos/seed/highschoolcampus/1200/400" // Placeholder image
          alt="High School Campus"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority // Load the image eagerly as it's above the fold
        />
      </div>

      <h1 className="text-4xl font-bold text-center text-primary">Welcome to Campus Connect</h1>
      <p className="text-lg text-center text-muted-foreground max-w-2xl">
        Your central hub for connecting with teachers, students, and alumni. Explore directories, register as alumni, and stay updated with school news.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Teachers Directory
            </CardTitle>
            <CardDescription>Meet our dedicated faculty members.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/teachers">
              <Button variant="outline">View Teachers</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="text-primary" />
              Students Directory
            </CardTitle>
            <CardDescription>Connect with current students.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/students">
              <Button variant="outline">View Students</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-accent" />
              Alumni Registration
            </CardTitle>
            <CardDescription>Join the alumni network.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/alumni/register">
              <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">Register Now</Button>
            </Link>
          </CardContent>
        </Card>

         {/* Link to Contact Us Page */}
         <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="text-primary" />
              Contact Us
            </CardTitle>
            <CardDescription>Get in touch with the school.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/contact">
              <Button variant="outline">Contact Info</Button>
            </Link>
          </CardContent>
        </Card>

         {/* Admin Panel Card Removed - Link is now conditional in Header */}
      </div>
    </div>
  );
}

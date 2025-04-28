
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Users, GraduationCap, FileText, Mail, ShieldCheck } from 'lucide-react'; // Updated ShieldCheck icon

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
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

         {/* Link to Admin Panel */}
         <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="text-primary"/> {/* Use Lucide icon */}
              Admin Panel
            </CardTitle>
            <CardDescription>Manage site content and users.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin">
              <Button variant="secondary">Go to Admin</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

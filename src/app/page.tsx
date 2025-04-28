
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { Users, GraduationCap, FileText, Mail, Camera } from 'lucide-react'; // Added Camera icon

export default function Home() {
  const galleryImages = [
    { seed: 'schoollife1', alt: 'Students studying in the library' },
    { seed: 'schoollife2', alt: 'Students playing sports on the field' },
    { seed: 'schoollife3', alt: 'School band performing' },
    { seed: 'schoollife4', alt: 'Art class creations' },
    { seed: 'schoollife5', alt: 'Science lab experiment' },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* High School Image */}
      <div className="w-full max-w-5xl mb-8 overflow-hidden rounded-lg shadow-lg">
        <Image
          src="https://picsum.photos/seed/highschoolcampus/1200/400" // Placeholder image
          alt="Ahiyas high school Campus"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority // Load the image eagerly as it's above the fold
        />
      </div>

      <h1 className="text-4xl font-bold text-center text-primary">Welcome to Ahiyas high school</h1>
      <p className="text-lg text-center text-muted-foreground max-w-2xl">
        Your central hub for connecting with teachers, students, and alumni at Ahiyas high school. Explore directories, register as alumni, and stay updated with school news.
      </p>

      {/* Card Grid */}
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
      </div>

      {/* Scrolling Image Section */}
      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Camera className="text-primary"/>
            Glimpses of School Life
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-secondary">
          {galleryImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-48 rounded-lg overflow-hidden shadow-md">
              <Image
                src={`https://picsum.photos/seed/${image.seed}/400/300`}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
         {/* Add Tailwind plugin if scrollbar styling is desired: npm i -D tailwind-scrollbar */}
         {/* And add require('tailwind-scrollbar') to plugins in tailwind.config.js */}
      </div>
    </div>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Mail className="text-primary" /> Contact Us
      </h1>
      <p className="text-muted-foreground">
        We'd love to hear from you! Reach out through any of the methods below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="text-primary"/> Our Location</CardTitle>
            <CardDescription>Visit us at our campus.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold">Ahiyas high school</p>
            <p>123 Learning Lane</p>
            <p>Knowledge City, EDU 54321</p>
            <p>United States</p>
             {/* Placeholder for a map - could use an iframe or a library like react-leaflet */}
            <div className="mt-4 h-48 bg-secondary rounded-md flex items-center justify-center text-muted-foreground">
                [Map Placeholder]
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Phone className="text-primary"/> Call Us</CardTitle>
            <CardDescription>Speak directly with our team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="font-semibold">General Inquiries:</span>{' '}
              <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
            <p>
              <span className="font-semibold">Admissions Office:</span>{' '}
              <a href="tel:+1-555-987-6543" className="text-primary hover:underline">
                +1 (555) 987-6543
              </a>
            </p>
             <p className="text-sm text-muted-foreground mt-2">Monday - Friday, 9:00 AM - 5:00 PM</p>
          </CardContent>
        </Card>

         <Card className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="text-primary"/> Email Us</CardTitle>
            <CardDescription>Send us a message anytime.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
             <p>
              <span className="font-semibold">General Info:</span>{' '}
              <a href="mailto:info@ahiyashs.edu" className="text-primary hover:underline">
                info@ahiyashs.edu
              </a>
            </p>
             <p>
              <span className="font-semibold">Support:</span>{' '}
              <a href="mailto:support@ahiyashs.edu" className="text-primary hover:underline">
                support@ahiyashs.edu
              </a>
            </p>
             <p>
              <span className="font-semibold">Alumni Relations:</span>{' '}
              <a href="mailto:alumni@ahiyashs.edu" className="text-primary hover:underline">
                alumni@ahiyashs.edu
              </a>
            </p>
             <p className="text-sm text-muted-foreground mt-2">We typically respond within 24-48 business hours.</p>
             {/* Optionally, add a simple contact form here using components from '@/components/ui/form' */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

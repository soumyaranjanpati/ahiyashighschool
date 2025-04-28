
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, School } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <School className="h-6 w-6" />
          <span className="text-xl font-bold">Campus Connect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
           <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            <Link href="/teachers">Teachers</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            <Link href="/students">Students</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            <Link href="/alumni/register">Alumni</Link>
          </Button>
           <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            <Link href="/contact">Contact Us</Link>
          </Button>
           <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-background text-foreground">
              <nav className="flex flex-col gap-4 pt-8">
                 <Link href="/" className="flex items-center gap-2 pb-4 border-b mb-4">
                    <School className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold text-primary">Campus Connect</span>
                  </Link>
                 <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                  <Link href="/">Home</Link>
                 </Button>
                <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                  <Link href="/teachers">Teachers</Link>
                </Button>
                <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                  <Link href="/students">Students</Link>
                </Button>
                <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                  <Link href="/alumni/register">Alumni</Link>
                </Button>
                 <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                  <Link href="/contact">Contact Us</Link>
                 </Button>
                 <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                  <Link href="/admin">Admin</Link>
                 </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

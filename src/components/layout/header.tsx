
'use client'; // Add this directive because we are using hooks (useContext)

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, School, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context'; // Import the useAuth hook

export function Header() {
  const { user, login, logout } = useAuth(); // Get auth state and functions

  const handleLogin = () => {
    // Simulate logging in as admin/user
    const isAdmin = window.prompt("Login as admin? (yes/no)")?.toLowerCase() === 'yes';
    login(isAdmin ? { id: 'admin-001', name: 'Admin User', isAdmin: true } : { id: 'user-123', name: 'Regular User', isAdmin: false });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <School className="h-6 w-6" />
          <span className="text-xl font-bold">Campus Connect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
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
           {user?.isAdmin && ( // Conditionally render Admin link
            <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
              <Link href="/admin">Admin</Link>
            </Button>
           )}
            {user ? (
             <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
               <LogOut className="mr-2 h-4 w-4" /> Logout ({user.name})
             </Button>
           ) : (
             <Button variant="ghost" onClick={handleLogin} className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
               <LogIn className="mr-2 h-4 w-4" /> Login
             </Button>
           )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
         {user ? (
             <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground p-1">
               <LogOut className="h-5 w-5" />
             </Button>
           ) : (
             <Button variant="ghost" size="sm" onClick={handleLogin} className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground p-1">
               <LogIn className="h-5 w-5" />
             </Button>
           )}
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
                 {user?.isAdmin && ( // Conditionally render Admin link
                  <Button variant="link" asChild className="justify-start text-foreground hover:text-primary">
                    <Link href="/admin">Admin</Link>
                  </Button>
                 )}
                 {/* Optional: Add login/logout to mobile menu too */}
                 {/* {user ? (...) : (...)} */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

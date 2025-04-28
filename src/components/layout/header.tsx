
'use client'; // Add this directive because we are using hooks (useContext)

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, School, LogIn, LogOut, User as UserIcon, Loader2 } from 'lucide-react'; // Added UserIcon and Loader2
import { useAuth } from '@/context/auth-context'; // Import the useAuth hook
import { LoginDialog } from '@/components/auth/login-dialog'; // Import the LoginDialog

export function Header() {
  const { user, logout, loading } = useAuth(); // Get auth state and functions, including loading

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <School className="h-6 w-6" />
          <span className="text-xl font-bold">Ahiyas high school</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 items-center">
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
           {/* Auth Buttons */}
            {loading ? (
                <Button variant="ghost" disabled className="text-primary-foreground opacity-50">
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </Button>
            ) : user ? (
             <div className="flex items-center gap-2">
                <span className="text-sm hidden sm:inline">
                  <UserIcon className="inline h-4 w-4 mr-1"/>
                  {user.name}
                </span>
                <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
                   <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
                   <span className='hidden sm:inline'>Logout</span>
                 </Button>
             </div>
           ) : (
             <LoginDialog>
               <Button variant="ghost" className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
                 <LogIn className="mr-2 h-4 w-4" /> Login
               </Button>
             </LoginDialog>
           )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
         {loading ? (
             <Button variant="ghost" size="icon" disabled className="text-primary-foreground opacity-50">
                <Loader2 className="h-5 w-5 animate-spin" />
             </Button>
         ) : user ? (
             <Button variant="ghost" size="icon" onClick={handleLogout} className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground p-1">
               <LogOut className="h-5 w-5" />
             </Button>
           ) : (
             <LoginDialog>
                 <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground p-1">
                   <LogIn className="h-5 w-5" />
                 </Button>
             </LoginDialog>
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
                    <span className="text-lg font-semibold text-primary">Ahiyas high school</span>
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
                 {/* Display username in mobile menu */}
                 {user && (
                    <div className="mt-auto pt-4 border-t text-sm text-muted-foreground">
                        Logged in as: {user.name}
                    </div>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

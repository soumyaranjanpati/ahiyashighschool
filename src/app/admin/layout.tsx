
'use client';

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { Loader2, ShieldAlert } from 'lucide-react'; // Import icons
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user or the user is not an admin, redirect
    if (!loading && (!user || !user.isAdmin)) {
      console.log("Redirecting: Not an admin or not logged in.");
      router.replace('/'); // Redirect to home page
    }
  }, [user, loading, router]);

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <span className="ml-4 text-lg">Checking access...</span>
      </div>
    );
  }

  // If user is loaded but not an admin (this state might be brief due to redirect)
  if (!user?.isAdmin) {
     return (
       <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
         <Card className="w-full max-w-md text-center shadow-lg">
           <CardHeader>
             <CardTitle className="flex items-center justify-center gap-2 text-destructive">
               <ShieldAlert className="h-8 w-8" /> Access Denied
             </CardTitle>
           </CardHeader>
           <CardContent>
             <p className="mb-4">You do not have permission to access this page.</p>
             <Button asChild>
               <Link href="/">Go to Home</Link>
             </Button>
           </CardContent>
         </Card>
       </div>
     );
   }


  // If user is an admin, render the children (the admin page)
  return <>{children}</>;
}


'use client';

import { useState, useActionState, useRef, useEffect } from 'react'; // Updated import: useActionState from react
// Removed useFormState import from react-dom as it's deprecated in favor of useActionState
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Users, UserPlus, Image as ImageIcon, Bell, ShieldCheck, GraduationCap, Loader2 } from 'lucide-react';
// Import Server Actions instead of directly importing services
import { handleAddTeacherAction, handleAddStudentAction } from '@/actions/adminActions';
import type { TeacherActionState, StudentActionState } from '@/actions/adminActions';
import { useFormStatus } from 'react-dom'; // Keep useFormStatus import

// Mock functions - replace with actual API calls or Server Actions
// Upload photo still mock - requires backend storage setup or separate server action
const uploadPhoto = async (file: File, type: 'teacher' | 'student' | 'gallery'): Promise<{ success: boolean; message: string, url?: string }> => {
  console.log(`Uploading ${type} photo:`, file.name);
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate success and return a placeholder URL
  // In a real app, this would involve uploading to storage (e.g., Firebase Storage, S3)
  // and returning the actual URL. For now, it simulates failure.
  // const mockUrl = `https://picsum.photos/seed/${Date.now()}/200/200`;
  // console.log(`Simulated upload successful, URL: ${mockUrl}`);
  // return { success: true, message: `Photo '${file.name}' uploaded successfully!`, url: mockUrl };
  return { success: false, message: `Photo upload simulation failed for ${file.name}. Storage not implemented.` };
};

const sendNotification = async (message: string) => {
  console.log('Sending notification:', message);
  await new Promise(resolve => setTimeout(resolve, 500));
  // Placeholder: Replace with actual notification logic (e.g., Firebase Cloud Messaging)
  return { success: true, message: 'Notification sent successfully! (Simulation)' };
};

// Define initial states for Server Actions
const initialTeacherState: TeacherActionState = { message: '', status: 'idle' };
const initialStudentState: StudentActionState = { message: '', status: 'idle' };


// SubmitButton Component to show pending status for Server Actions
function SubmitButton({ children, loading }: { children: React.ReactNode, loading: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || loading}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}


export default function AdminPage() {
  // Server Action states - Use useActionState instead of useFormState
  const [teacherState, teacherFormAction] = useActionState(handleAddTeacherAction, initialTeacherState);
  const [studentState, studentFormAction] = useActionState(handleAddStudentAction, initialStudentState);

  // Local UI states
  const [teacherImageFile, setTeacherImageFile] = useState<File | null>(null);
  const [studentImageFile, setStudentImageFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Separate loading states for non-server-action operations
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [isLoadingNotification, setIsLoadingNotification] = useState(false);

  // Refs for resetting forms
  const teacherFormRef = useRef<HTMLFormElement>(null);
  const studentFormRef = useRef<HTMLFormElement>(null);
  const photoFormRef = useRef<HTMLFormElement>(null);
  const notificationFormRef = useRef<HTMLFormElement>(null);


  // Helper to reset file input visually
  const resetFileInput = (id: string) => {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  // Effect to show toast messages based on Server Action state changes
   useEffect(() => {
      if (teacherState.status === 'success') {
        toast({ title: 'Success', description: teacherState.message });
        teacherFormRef.current?.reset(); // Reset the form visually
        setTeacherImageFile(null); // Clear file state
        resetFileInput('teacher-image-upload'); // Reset file input visually
        // Reset state without re-triggering
        // Consider a more robust state reset mechanism if needed
      } else if (teacherState.status === 'error') {
        toast({ title: 'Error', description: teacherState.message, variant: 'destructive' });
      }
   }, [teacherState]);

   useEffect(() => {
     if (studentState.status === 'success') {
        toast({ title: 'Success', description: studentState.message });
        studentFormRef.current?.reset(); // Reset the form visually
        setStudentImageFile(null); // Clear file state
        resetFileInput('student-image-upload'); // Reset file input visually
     } else if (studentState.status === 'error') {
        toast({ title: 'Error', description: studentState.message, variant: 'destructive' });
     }
   }, [studentState]);


  // Handle Photo Gallery Upload (Still Mock, uses local state for loading)
  const handlePhotoUpload = async (e: React.FormEvent) => {
     e.preventDefault();
    if (!photoFile) {
      toast({ title: 'Error', description: 'Please select a photo to upload.', variant: 'destructive' });
      return;
    }
    setIsLoadingPhoto(true);
    const result = await uploadPhoto(photoFile, 'gallery');
    setIsLoadingPhoto(false);
    if (result.success) {
      toast({ title: 'Success', description: result.message });
       setPhotoFile(null);
       photoFormRef.current?.reset();
       resetFileInput('photo-upload');
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  // Handle Notification Send (Still Mock, uses local state for loading)
  const handleNotificationSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationMessage.trim()) {
      toast({ title: 'Error', description: 'Notification message cannot be empty.', variant: 'destructive' });
      return;
    }
     setIsLoadingNotification(true);
    const result = await sendNotification(notificationMessage);
     setIsLoadingNotification(false);
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      setNotificationMessage('');
      notificationFormRef.current?.reset();
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  // --- Render Section ---
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
         <ShieldCheck className="text-primary"/>
        Admin Panel
      </h1>
      <p className="text-muted-foreground">Manage school content and send notifications.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Add New Teacher */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserPlus className="text-primary"/> Add New Teacher</CardTitle>
            <CardDescription>Enter the details for the new teacher.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Form now uses the Server Action */}
            <form ref={teacherFormRef} action={teacherFormAction} className="space-y-4">
              <div>
                <Label htmlFor="teacher-name">Teacher Name</Label>
                <Input id="teacher-name" name="teacherName" placeholder="e.g., Dr. Jane Foster" required />
              </div>
               <div>
                <Label htmlFor="teacher-subject">Subject</Label>
                <Input id="teacher-subject" name="teacherSubject" placeholder="e.g., Astrophysics" required />
              </div>
               <div>
                 <Label htmlFor="teacher-image-upload">Teacher Photo (Optional)</Label>
                 {/* File inputs aren't directly supported by standard FormData in Server Actions easily yet for server upload */}
                 {/* Keeping this as a client-side state for now, potentially handle upload separately */}
                 <Input
                    id="teacher-image-upload"
                    name="teacherImage" // Name needed if handling via FormData, but complex
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTeacherImageFile(e.target.files ? e.target.files[0] : null)}
                 />
                 <p className="text-xs text-muted-foreground mt-1">Note: Photo upload is currently simulated/not functional.</p>
               </div>
              <SubmitButton loading={false}>Add Teacher</SubmitButton>
            </form>
          </CardContent>
        </Card>

         {/* Add New Student */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GraduationCap className="text-primary"/> Add New Student</CardTitle>
            <CardDescription>Enter the details for the new student.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Form now uses the Server Action */}
            <form ref={studentFormRef} action={studentFormAction} className="space-y-4">
              <div>
                <Label htmlFor="student-name">Student Name</Label>
                <Input id="student-name" name="studentName" placeholder="e.g., Peter Parker" required />
              </div>
              <div>
                <Label htmlFor="student-major">Major / Program</Label>
                <Input id="student-major" name="studentMajor" placeholder="e.g., Biochemistry" required />
              </div>
               <div>
                 <Label htmlFor="student-year">Year</Label>
                 <Input id="student-year" name="studentYear" type="number" min="1" step="1" placeholder="e.g., 3" required />
               </div>
               <div>
                 <Label htmlFor="student-image-upload">Student Photo (Optional)</Label>
                  {/* File inputs complexity */}
                 <Input
                    id="student-image-upload"
                    name="studentImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setStudentImageFile(e.target.files ? e.target.files[0] : null)}
                  />
                   <p className="text-xs text-muted-foreground mt-1">Note: Photo upload is currently simulated/not functional.</p>
               </div>
              <SubmitButton loading={false}>Add Student</SubmitButton>
            </form>
          </CardContent>
        </Card>


        {/* Upload New Photo (Gallery - Mock) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="text-primary"/> Upload Gallery Photo</CardTitle>
            <CardDescription>Add a new photo to the school gallery (Simulation).</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={photoFormRef} onSubmit={handlePhotoUpload} className="space-y-4">
              <div>
                <Label htmlFor="photo-upload">Select Photo</Label>
                <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)}
                    required
                    disabled={isLoadingPhoto}
                />
              </div>
              <Button type="submit" disabled={isLoadingPhoto}>
                 {isLoadingPhoto ? (
                     <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Uploading...
                     </>
                    ) : 'Upload Photo'}
              </Button>
            </form>
          </CardContent>
        </Card>

         {/* Send Notification (Mock) */}
        <Card className="md:col-span-2 lg:col-span-3"> {/* Adjust span for layout */}
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="text-accent"/> Send Notification</CardTitle>
            <CardDescription>Broadcast a message (Simulation).</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={notificationFormRef} onSubmit={handleNotificationSend} className="space-y-4">
              <div>
                <Label htmlFor="notification-message">Notification Message</Label>
                <Textarea
                  id="notification-message"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter your notification message here..."
                  required
                  rows={4}
                  disabled={isLoadingNotification}
                />
              </div>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoadingNotification}>
                {isLoadingNotification ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                    ) : 'Send Notification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

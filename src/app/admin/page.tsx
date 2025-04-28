
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Users, UserPlus, Image as ImageIcon, Bell, ShieldCheck, GraduationCap } from 'lucide-react';
import { addTeacher } from '@/services/teacherService'; // Import actual service
import { addStudent } from '@/services/studentService'; // Import actual service
import type { TeacherInput } from '@/types/teacher';
import type { StudentInput } from '@/types/student';

// Mock functions - replace with actual API calls (partially done for addTeacher/addStudent)
// Upload photo still mock - requires backend storage setup
const uploadPhoto = async (file: File, type: 'teacher' | 'student' | 'gallery'): Promise<{ success: boolean; message: string, url?: string }> => {
  console.log(`Uploading ${type} photo:`, file.name);
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate success and return a placeholder URL
  const mockUrl = `https://picsum.photos/seed/${Date.now()}/200/200`; // Placeholder URL
  console.log(`Simulated upload successful, URL: ${mockUrl}`);
  // return { success: true, message: `Photo '${file.name}' uploaded successfully!`, url: mockUrl };
   return { success: false, message: `Photo upload simulation failed for ${file.name}. Storage not implemented.` };
};

const sendNotification = async (message: string) => {
  console.log('Sending notification:', message);
  await new Promise(resolve => setTimeout(resolve, 500));
  // Placeholder: Replace with actual notification logic (e.g., Firebase Cloud Messaging)
  return { success: true, message: 'Notification sent successfully! (Simulation)' };
};


export default function AdminPage() {
  // Teacher State
  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [teacherImageFile, setTeacherImageFile] = useState<File | null>(null);

  // Student State
  const [studentName, setStudentName] = useState('');
  const [studentMajor, setStudentMajor] = useState('');
  const [studentYear, setStudentYear] = useState<number | string>(''); // Use string for input, convert later
  const [studentImageFile, setStudentImageFile] = useState<File | null>(null);

  // Photo Gallery State
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Notification State
  const [notificationMessage, setNotificationMessage] = useState('');

  // Loading State
  const [isLoading, setIsLoading] = useState({
    teacher: false,
    student: false,
    photo: false,
    notification: false,
  });

  // Helper to reset file input visually
  const resetFileInput = (id: string) => {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  // Handle Teacher Submit
  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherSubject) {
      toast({ title: 'Error', description: 'Teacher name and subject are required.', variant: 'destructive' });
      return;
    }
    setIsLoading(prev => ({ ...prev, teacher: true }));

    let imageUrl: string | null = null;
    // Handle image upload (simulation for now)
    if (teacherImageFile) {
      const uploadResult = await uploadPhoto(teacherImageFile, 'teacher');
      if (!uploadResult.success) {
         toast({ title: 'Image Upload Failed', description: uploadResult.message, variant: 'destructive' });
         setIsLoading(prev => ({ ...prev, teacher: false }));
         return; // Stop if image upload fails
      }
       imageUrl = uploadResult.url ?? null; // Use the returned URL
    }

    const teacherData: TeacherInput = {
      name: teacherName,
      subject: teacherSubject,
      image: imageUrl,
    };

    try {
      const newTeacherId = await addTeacher(teacherData);
      toast({ title: 'Success', description: `Teacher '${teacherName}' added successfully with ID ${newTeacherId}.` });
      // Reset form
      setTeacherName('');
      setTeacherSubject('');
      setTeacherImageFile(null);
      resetFileInput('teacher-image-upload');
    } catch (error: any) {
      console.error("Error adding teacher:", error);
      toast({ title: 'Error Adding Teacher', description: error.message || 'An unknown error occurred.', variant: 'destructive' });
    } finally {
      setIsLoading(prev => ({ ...prev, teacher: false }));
    }
  };

  // Handle Student Submit
  const handleStudentSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const yearNumber = typeof studentYear === 'string' ? parseInt(studentYear, 10) : studentYear;

     if (!studentName || !studentMajor || !studentYear || isNaN(yearNumber) || yearNumber < 1) {
       toast({ title: 'Error', description: 'Student name, major, and a valid year are required.', variant: 'destructive' });
       return;
     }
     setIsLoading(prev => ({ ...prev, student: true }));

     let imageUrl: string | null = null;
     // Handle image upload (simulation)
     if (studentImageFile) {
       const uploadResult = await uploadPhoto(studentImageFile, 'student');
        if (!uploadResult.success) {
            toast({ title: 'Image Upload Failed', description: uploadResult.message, variant: 'destructive' });
            setIsLoading(prev => ({ ...prev, student: false }));
            return; // Stop if image upload fails
        }
        imageUrl = uploadResult.url ?? null;
     }

     const studentData: StudentInput = {
       name: studentName,
       major: studentMajor,
       year: yearNumber,
       image: imageUrl,
     };

     try {
       const newStudentId = await addStudent(studentData);
       toast({ title: 'Success', description: `Student '${studentName}' added successfully with ID ${newStudentId}.` });
       // Reset form
       setStudentName('');
       setStudentMajor('');
       setStudentYear('');
       setStudentImageFile(null);
       resetFileInput('student-image-upload');
     } catch (error: any) {
        console.error("Error adding student:", error);
        toast({ title: 'Error Adding Student', description: error.message || 'An unknown error occurred.', variant: 'destructive' });
     } finally {
        setIsLoading(prev => ({ ...prev, student: false }));
     }
   };


  // Handle Photo Gallery Upload (Still Mock)
  const handlePhotoUpload = async (e: React.FormEvent) => {
     e.preventDefault();
    if (!photoFile) {
      toast({ title: 'Error', description: 'Please select a photo to upload.', variant: 'destructive' });
      return;
    }
    setIsLoading(prev => ({ ...prev, photo: true }));
    const result = await uploadPhoto(photoFile, 'gallery');
     setIsLoading(prev => ({ ...prev, photo: false }));
    if (result.success) {
      toast({ title: 'Success', description: result.message });
       setPhotoFile(null);
       resetFileInput('photo-upload');
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  // Handle Notification Send (Still Mock)
  const handleNotificationSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationMessage.trim()) {
      toast({ title: 'Error', description: 'Notification message cannot be empty.', variant: 'destructive' });
      return;
    }
     setIsLoading(prev => ({ ...prev, notification: true }));
    const result = await sendNotification(notificationMessage);
     setIsLoading(prev => ({ ...prev, notification: false }));
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      setNotificationMessage('');
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

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
            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div>
                <Label htmlFor="teacher-name">Teacher Name</Label>
                <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="e.g., Dr. Jane Foster" required disabled={isLoading.teacher} />
              </div>
               <div>
                <Label htmlFor="teacher-subject">Subject</Label>
                <Input id="teacher-subject" value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} placeholder="e.g., Astrophysics" required disabled={isLoading.teacher}/>
              </div>
               <div>
                 <Label htmlFor="teacher-image-upload">Teacher Photo (Optional)</Label>
                 <Input id="teacher-image-upload" type="file" accept="image/*" onChange={(e) => setTeacherImageFile(e.target.files ? e.target.files[0] : null)} disabled={isLoading.teacher}/>
               </div>
              <Button type="submit" disabled={isLoading.teacher}>
                {isLoading.teacher ? 'Adding...' : 'Add Teacher'}
              </Button>
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
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <Label htmlFor="student-name">Student Name</Label>
                <Input id="student-name" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g., Peter Parker" required disabled={isLoading.student} />
              </div>
              <div>
                <Label htmlFor="student-major">Major / Program</Label>
                <Input id="student-major" value={studentMajor} onChange={(e) => setStudentMajor(e.target.value)} placeholder="e.g., Biochemistry" required disabled={isLoading.student} />
              </div>
               <div>
                 <Label htmlFor="student-year">Year</Label>
                 <Input id="student-year" type="number" min="1" step="1" value={studentYear} onChange={(e) => setStudentYear(e.target.value)} placeholder="e.g., 3" required disabled={isLoading.student}/>
               </div>
               <div>
                 <Label htmlFor="student-image-upload">Student Photo (Optional)</Label>
                 <Input id="student-image-upload" type="file" accept="image/*" onChange={(e) => setStudentImageFile(e.target.files ? e.target.files[0] : null)} disabled={isLoading.student}/>
               </div>
              <Button type="submit" disabled={isLoading.student}>
                 {isLoading.student ? 'Adding...' : 'Add Student'}
              </Button>
            </form>
          </CardContent>
        </Card>


        {/* Upload New Photo (Gallery) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="text-primary"/> Upload Gallery Photo</CardTitle>
            <CardDescription>Add a new photo to the school gallery.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePhotoUpload} className="space-y-4">
              <div>
                <Label htmlFor="photo-upload">Select Photo</Label>
                <Input id="photo-upload" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)} required disabled={isLoading.photo}/>
              </div>
              <Button type="submit" disabled={isLoading.photo}>
                 {isLoading.photo ? 'Uploading...' : 'Upload Photo'}
              </Button>
            </form>
          </CardContent>
        </Card>

         {/* Send Notification */}
        <Card className="md:col-span-2 lg:col-span-3"> {/* Adjust span for layout */}
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="text-accent"/> Send Notification</CardTitle>
            <CardDescription>Broadcast a message (simulation).</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNotificationSend} className="space-y-4">
              <div>
                <Label htmlFor="notification-message">Notification Message</Label>
                <Textarea
                  id="notification-message"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter your notification message here..."
                  required
                  rows={4}
                   disabled={isLoading.notification}
                />
              </div>
              {/* Add target audience selection if needed */}
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading.notification}>
                {isLoading.notification ? 'Sending...' : 'Send Notification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

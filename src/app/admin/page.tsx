
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Users, UserPlus, Image as ImageIcon, Bell, ShieldCheck } from 'lucide-react'; // Import ShieldCheck

// Mock functions - replace with actual API calls
const uploadPhoto = async (file: File) => {
  console.log('Uploading photo:', file.name);
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate success
  return { success: true, message: `Photo '${file.name}' uploaded successfully!` };
};

const addTeacher = async (teacherData: { name: string; subject: string; image?: File }) => {
  console.log('Adding teacher:', teacherData);
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Handle image upload if present
  if (teacherData.image) {
     await uploadPhoto(teacherData.image);
  }
  return { success: true, message: `Teacher '${teacherData.name}' added successfully!` };
};

const sendNotification = async (message: string) => {
  console.log('Sending notification:', message);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: 'Notification sent successfully!' };
};


export default function AdminPage() {
  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [teacherImage, setTeacherImage] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState({
    photo: false,
    teacher: false,
    notification: false,
  });

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherSubject) {
      toast({ title: 'Error', description: 'Teacher name and subject are required.', variant: 'destructive' });
      return;
    }
    setIsLoading(prev => ({ ...prev, teacher: true }));
    const result = await addTeacher({ name: teacherName, subject: teacherSubject, image: teacherImage || undefined });
    setIsLoading(prev => ({ ...prev, teacher: false }));
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      setTeacherName('');
      setTeacherSubject('');
      setTeacherImage(null);
       // Reset file input visually might need extra state/ref handling in a real app
      const fileInput = document.getElementById('teacher-image-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = '';
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  const handlePhotoUpload = async (e: React.FormEvent) => {
     e.preventDefault();
    if (!photoFile) {
      toast({ title: 'Error', description: 'Please select a photo to upload.', variant: 'destructive' });
      return;
    }
    setIsLoading(prev => ({ ...prev, photo: true }));
    const result = await uploadPhoto(photoFile);
     setIsLoading(prev => ({ ...prev, photo: false }));
    if (result.success) {
      toast({ title: 'Success', description: result.message });
       setPhotoFile(null);
       // Reset file input
       const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = '';
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

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
         <ShieldCheck className="text-primary"/> {/* Use Lucide icon */}
        Admin Panel
      </h1>
      <p className="text-muted-foreground">Manage school content and send notifications.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="e.g., Dr. Jane Foster" required />
              </div>
               <div>
                <Label htmlFor="teacher-subject">Subject</Label>
                <Input id="teacher-subject" value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} placeholder="e.g., Astrophysics" required />
              </div>
               <div>
                 <Label htmlFor="teacher-image-upload">Teacher Photo (Optional)</Label>
                 <Input id="teacher-image-upload" type="file" accept="image/*" onChange={(e) => setTeacherImage(e.target.files ? e.target.files[0] : null)} />
               </div>
              <Button type="submit" disabled={isLoading.teacher}>
                {isLoading.teacher ? 'Adding...' : 'Add Teacher'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Upload New Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="text-primary"/> Upload New Photo</CardTitle>
            <CardDescription>Add a new photo to the school gallery or resources.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePhotoUpload} className="space-y-4">
              <div>
                <Label htmlFor="photo-upload">Select Photo</Label>
                <Input id="photo-upload" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)} required/>
              </div>
              <Button type="submit" disabled={isLoading.photo}>
                 {isLoading.photo ? 'Uploading...' : 'Upload Photo'}
              </Button>
            </form>
          </CardContent>
        </Card>

         {/* Send Notification */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="text-accent"/> Send Notification</CardTitle>
            <CardDescription>Broadcast a message to students and/or teachers.</CardDescription>
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
                />
              </div>
              {/* Add target audience selection if needed (e.g., All, Teachers, Students) */}
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

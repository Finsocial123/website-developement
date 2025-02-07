import { Search, Eye, EyeOff, MessageSquare, Bot, LineChart, Sun, Moon, Menu, Mic } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import SideBarRight from '../components/sideBarRight'; 

export default function Header({ onMenuClick }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorderRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleRecordingToggle = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        setRecordedChunks([]);  // Clear chunks for the next recording
        uploadToCloudinary(blob);
        stopStream(stream);  // Stop the stream after recording ends
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const stopStream = (stream) => {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  };

  const uploadToCloudinary = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'video_upload');  // Use unsigned preset

    const cloudName = 'dz17f7tvk';  // Your Cloudinary cloud name

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        console.log('Upload Complete:', data.secure_url);
      } else {
        console.error('Upload Failed:', data);
      }
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background border-b dark:bg-black dark:text-white text-black bg-white">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-muted rounded-lg">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <img src="./logo.png" alt="Logo" className="h-8 w-8" />
          <span className="ml-2 font-bold text-xl dark:text-white text-black">Boltz</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-muted rounded-full w-[300px] dark:bg-black dark:text-white text-black bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Center section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-muted rounded-lg" onClick={handleRecordingToggle}>
          {isRecording ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Mic className="h-5 w-5" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-muted rounded-lg">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Bot className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg">
          <LineChart className="h-5 w-5" />
        </button>
        <button onClick={toggleTheme} className="p-2 hover:bg-muted rounded-lg">
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
        <SideBarRight isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>
    </header>
  );
}
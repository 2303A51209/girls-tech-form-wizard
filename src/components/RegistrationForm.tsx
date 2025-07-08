import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Share2, CheckCircle, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  phone: string;
  email: string;
  college: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    college: "",
  });
  const [shareCount, setShareCount] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  // Check if already submitted
  useEffect(() => {
    const submitted = localStorage.getItem("techForGirlsSubmitted");
    if (submitted === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppShare = () => {
    if (shareCount >= 5) return;
    
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community! 🚀💜");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    setShareCount(prev => prev + 1);
    
    if (shareCount + 1 === 5) {
      toast({
        title: "Sharing complete! 🎉",
        description: "Please continue with your registration.",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (shareCount < 5) {
      toast({
        title: "Please complete sharing first! 📱",
        description: "You need to share on WhatsApp 5 times before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.phone || !formData.email || !formData.college) {
      toast({
        title: "Please fill all fields! 📝",
        description: "All fields are required for registration.",
        variant: "destructive",
      });
      return;
    }

    if (!uploadedFile) {
      toast({
        title: "Please upload a screenshot! 📷",
        description: "A screenshot upload is required for registration.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission - in real app, this would send to Google Sheets
    console.log("Form Data:", formData);
    console.log("Uploaded File:", uploadedFile);
    
    setIsSubmitted(true);
    localStorage.setItem("techForGirlsSubmitted", "true");
    
    toast({
      title: "🎉 Registration Successful!",
      description: "Your submission has been recorded. Thanks for being part of Tech for Girls!",
    });
  };

  const isFormValid = formData.name && formData.phone && formData.email && formData.college && uploadedFile && shareCount >= 5;

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-glow rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary-glow rounded-full blur-2xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow rounded-full blur-xl animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-8 w-8 text-primary-glow" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Tech for Girls
            </h1>
            <Sparkles className="h-8 w-8 text-primary-glow" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our amazing community of tech-savvy girls! Register now to be part of something incredible.
          </p>
        </div>

        {/* Registration Form */}
        <Card className="max-w-2xl mx-auto shadow-card bg-card/90 backdrop-blur-sm border-primary/20 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-card-foreground">
              {isSubmitted ? "Registration Complete! 🎉" : "Join Our Community"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSubmitted 
                ? "Thank you for joining Tech for Girls! We're excited to have you."
                : "Fill out the form below to become part of our tech community"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-scale-in" />
                <p className="text-lg font-medium text-card-foreground">
                  🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="transition-smooth focus:shadow-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="transition-smooth focus:shadow-glow"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="transition-smooth focus:shadow-glow"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="college">College/Department</Label>
                    <Select onValueChange={(value) => handleInputChange("college", value)}>
                      <SelectTrigger className="transition-smooth focus:shadow-glow">
                        <SelectValue placeholder="Select your college/department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="information-technology">Information Technology</SelectItem>
                        <SelectItem value="electronics">Electronics & Communication</SelectItem>
                        <SelectItem value="electrical">Electrical Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* WhatsApp Sharing */}
                <div className="space-y-4 p-4 bg-gradient-secondary rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">Share on WhatsApp</h3>
                    <span className="text-sm text-muted-foreground">
                      {shareCount}/5 clicks
                    </span>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={handleWhatsAppShare}
                    disabled={shareCount >= 5}
                    variant={shareCount >= 5 ? "default" : "gradient"}
                    className={cn(
                      "w-full transition-bounce",
                      shareCount >= 5 && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {shareCount >= 5 ? "Sharing Complete!" : "Share on WhatsApp"}
                  </Button>
                  
                  {shareCount >= 5 && (
                    <p className="text-sm text-green-400 text-center animate-fade-in">
                      ✅ Sharing complete. Please continue.
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>Upload Screenshot</Label>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer",
                      dragActive ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50",
                      uploadedFile && "border-green-500 bg-green-500/10"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                        <p className="text-sm font-medium text-green-400">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm font-medium text-card-foreground">
                          Drag & drop or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Upload your resume, photo, or any screenshot
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant={isFormValid ? "gradient" : "default"}
                  className={cn(
                    "w-full py-6 text-lg font-semibold transition-bounce",
                    isFormValid ? "animate-glow-pulse" : "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!isFormValid}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Submit Registration
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Download, FileImage, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Certificate {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Keep for backward compatibility
  image_base64?: string; // Add for new API format
  fileName: string;
  uploadDate: string;
  file_id?: string;
  content_type?: string;
  filename?: string;
}

// API Response interface based on your data
interface ApiCertificate {
  content_type: string;
  description: string;
  file_id: string;
  filename: string;
  image_base64: string;
  title: string;
}

interface ApiResponse {
  detail?: ApiCertificate[];
  certificates?: Certificate[]; // Fallback for other possible structures
  data?: Certificate[]; // Another fallback
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Helper function to get image source
  const getImageSrc = (certificate: Certificate): string => {
    if (certificate.image_base64) {
      return certificate.image_base64;
    }
    return certificate.imageUrl || "";
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (e.g., max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      setError("Please select a file and enter a title");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
      formData.append("title", title.trim());
      formData.append("description", description.trim());

      console.log("Uploading file:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        title: title.trim(),
        description: description.trim(),
      });

      const response = await fetch(
        "https://tfoe-backend.onrender.com/member/certificate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);

        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(
            errorJson.message || errorJson.error || `HTTP ${response.status}`
          );
        } catch {
          throw new Error(
            `Upload failed with status ${response.status}: ${errorText}`
          );
        }
      }

      const result = await response.json();
      console.log("Upload success:", result);
      setError(null);

      // Refresh the certificates list
      await loadCertificates();

      // Reset form
      setTitle("");
      setDescription("");
      handleRemoveFile();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload certificate. Please try again.";
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (certificate: Certificate) => {
    try {
      let blob: Blob;

      if (certificate.image_base64) {
        // Convert base64 to blob
        const base64Data = certificate.image_base64.split(",")[1]; // Remove data:image/png;base64, prefix
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], {
          type: certificate.content_type || "image/png",
        });
      } else if (certificate.imageUrl) {
        // Fallback to URL fetch
        const response = await fetch(certificate.imageUrl);
        blob = await response.blob();
      } else {
        throw new Error("No image data available");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        certificate.filename ||
        certificate.fileName ||
        `${certificate.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download certificate");
    }
  };

  // Extract loadCertificates as a separate function so it can be reused
  const loadCertificates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No access token found. Please log in again.");
        return;
      }

      const response = await fetch(
        "https://tfoe-backend.onrender.com/member/certificate",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        // Transform API data to match Certificate interface
        let certificatesArray: Certificate[] = [];

        if (data.detail && Array.isArray(data.detail)) {
          certificatesArray = data.detail.map(
            (apiCert: ApiCertificate, index: number) => ({
              id: apiCert.file_id || `cert-${index}`,
              title: apiCert.title,
              description: apiCert.description,
              image_base64: apiCert.image_base64,
              fileName: apiCert.filename,
              filename: apiCert.filename, // Keep both for compatibility
              uploadDate: new Date().toISOString(), // API doesn't seem to provide this
              file_id: apiCert.file_id,
              content_type: apiCert.content_type,
            })
          );
        } else {
          // Fallback for other response structures
          if (Array.isArray(data)) {
            certificatesArray = data as Certificate[];
          } else if (data.certificates && Array.isArray(data.certificates)) {
            certificatesArray = data.certificates as Certificate[];
          } else if (data.data && Array.isArray(data.data)) {
            certificatesArray = data.data as Certificate[];
          }
        }

        setCertificates(certificatesArray);
      } else {
        console.error("Failed to fetch certificates:", response.status);
        setCertificates([]);
      }
    } catch (error) {
      console.error("Failed to load certificates:", error);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Load certificates on mount
  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <SidebarInset className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink className="text-muted-foreground">
                Certificates
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="font-bold text-xl w-full sm:flex-1">Certificates</h1>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Certificate</DialogTitle>
                <DialogDescription>
                  Upload an image file and provide details for your certificate.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Certificate Image *</Label>
                  {!selectedFile ? (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <FileImage className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <FileImage className="h-8 w-8 text-green-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveFile}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {previewUrl && (
                          <div className="mt-3">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded border"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Name *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter event name"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter event description (optional)"
                    rows={3}
                  />
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                    {error}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || !title.trim() || uploading}
                >
                  {uploading ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 w-full min-h-[200px]">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <FileImage className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              No certificates uploaded yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Upload your first certificate to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={getImageSrc(certificate)}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", certificate);
                      // You could set a fallback image here
                      // e.currentTarget.src = "/fallback-image.png";
                    }}
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-base line-clamp-1">
                    {certificate.title}
                  </CardTitle>
                  {certificate.description && (
                    <CardDescription className="line-clamp-2">
                      {certificate.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(certificate.uploadDate).toLocaleDateString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(certificate)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SidebarInset>
  );
}

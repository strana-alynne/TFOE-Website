"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, ArrowLeft, ArrowRight, Upload, Send } from "lucide-react";
import React from "react";
import { addAttendance, uploadDocument } from "../../../actions";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  full_name: string;
  region: string;
  club_name: string;
  date_of_arrival: string;
  departure: string;
  eagle_id: string;
  job_title: string;
  company_name: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  linkedin: string;
  other_links: string;
  industrySector: string;
  company_size: string;
  products_offered: string;
  website: string;
  socials: string;
  export_import_exp: string;
  purpose: string;
  target_market: string;
  type_of_partner: string;
  investment_interest: string;
  document_link: string;
  dietary_restrictions: string;
  isPaid: boolean;
  pdpaConsent: boolean;
  marketingConsent: boolean;
  promotionalConsent: boolean;
  ticket_type: string;
}

interface StepComponentProps {
  formData: FormData;
  updateFormData: (field: string, value: string | boolean) => void;
  errors: Record<string, string>; // Add this line
}

const BasicInformation = ({
  formData,
  updateFormData,
  errors,
}: StepComponentProps) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="full_name">Full Name *</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => updateFormData("full_name", e.target.value)}
          placeholder="Enter your full name"
          className={errors.full_name ? "border-red-500" : ""}
        />
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="region">Region *</Label>
        <Input
          id="region"
          value={formData.region}
          onChange={(e) => updateFormData("region", e.target.value)}
          placeholder="Enter your region"
          className={errors.region ? "border-red-500" : ""}
        />
        {errors.region && (
          <p className="text-red-500 text-xs mt-1">{errors.region}</p>
        )}
      </div>
      <div>
        <Label htmlFor="club_name">Club Name</Label>
        <Input
          id="club_name"
          value={formData.club_name}
          onChange={(e) => updateFormData("club_name", e.target.value)}
          placeholder="Enter club name"
        />
      </div>
      <div>
        <Label htmlFor="flight_dates">
          Flight Dates (Arrival - Departure) *
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="date_of_arrival"
            type="date"
            value={formData.date_of_arrival}
            onChange={(e) => updateFormData("date_of_arrival", e.target.value)}
            className={
              errors.date_of_arrival || errors.departure ? "border-red-500" : ""
            }
            placeholder="Arrival"
          />
          <span className="text-gray-500">-</span>
          <Input
            id="departure"
            type="date"
            value={formData.departure}
            onChange={(e) => updateFormData("departure", e.target.value)}
            className={
              errors.date_of_arrival || errors.departure ? "border-red-500" : ""
            }
            placeholder="Departure"
          />
        </div>
        {(errors.date_of_arrival || errors.departure) && (
          <p className="text-red-500 text-xs mt-1">
            {errors.date_of_arrival || errors.departure}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="eagle_id">Eagle ID Number</Label>
        <Input
          id="eagle_id"
          value={formData.eagle_id}
          onChange={(e) => updateFormData("eagle_id", e.target.value)}
          placeholder="Enter Eagle ID"
        />
      </div>
      <div>
        <Label htmlFor="job_title">Job Title *</Label>
        <Input
          id="job_title"
          value={formData.job_title}
          onChange={(e) => updateFormData("job_title", e.target.value)}
          placeholder="Enter your job title"
          className={errors.job_title ? "border-red-500" : ""}
        />
        {errors.job_title && (
          <p className="text-red-500 text-xs mt-1">{errors.job_title}</p>
        )}
      </div>
      <div>
        <Label htmlFor="company_name">Company Name *</Label>
        <Input
          id="company_name"
          value={formData.company_name}
          onChange={(e) => updateFormData("company_name", e.target.value)}
          placeholder="Enter company name"
          className={errors.company_name ? "border-red-500" : ""}
        />
        {errors.company_name && (
          <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="country">Country *</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => updateFormData("country", e.target.value)}
          placeholder="Enter country"
          className={errors.country ? "border-red-500" : ""}
        />
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country}</p>
        )}
      </div>
      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => updateFormData("city", e.target.value)}
          placeholder="Enter city"
          className={errors.city ? "border-red-500" : ""}
        />
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Enter your email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          placeholder="Enter phone number"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={formData.linkedin}
          onChange={(e) => updateFormData("linkedin", e.target.value)}
          placeholder="LinkedIn URL"
        />
      </div>
      <div>
        <Label htmlFor="other_links">Other Social Media Links</Label>
        <Input
          id="other_links"
          value={formData.other_links}
          onChange={(e) => updateFormData("other_links", e.target.value)}
          placeholder="WeChat/WhatsApp/TikTok handles"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="dietary_restrictions">Dietary Restrictions *</Label>
        <Textarea
          id="dietary_restrictions"
          value={formData.dietary_restrictions}
          onChange={(e) =>
            updateFormData("dietary_restrictions", e.target.value)
          }
          placeholder="Please specify any dietary restrictions, allergies, or special meal requirements"
          className={errors.dietary_restrictions ? "border-red-500" : ""}
          rows={3}
        />
        {errors.dietary_restrictions && (
          <p className="text-red-500 text-xs mt-1">
            {errors.dietary_restrictions}
          </p>
        )}
      </div>
    </div>
  </div>
);

const CompanyProfile = ({
  formData,
  updateFormData,
  errors,
}: StepComponentProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="company_size">Company Size *</Label>
      <Input
        id="company_size"
        value={formData.company_size}
        onChange={(e) => updateFormData("company_size", e.target.value)}
        placeholder="e.g., 50 employees, $5M annual revenue"
        className={errors.company_size ? "border-red-500" : ""}
      />
      {errors.company_size && (
        <p className="text-red-500 text-xs mt-1">{errors.company_size}</p>
      )}
    </div>
    <div>
      <Label htmlFor="products_offered">Products/Services Offered *</Label>
      <Textarea
        id="products_offered"
        value={formData.products_offered}
        onChange={(e) => updateFormData("products_offered", e.target.value)}
        placeholder="Describe your products or services"
        rows={3}
        className={errors.products_offered ? "border-red-500" : ""}
      />
      {errors.products_offered && (
        <p className="text-red-500 text-xs mt-1">{errors.products_offered}</p>
      )}
    </div>
    <div>
      <Label htmlFor="website">Website</Label>
      <Input
        id="website"
        value={formData.website}
        onChange={(e) => updateFormData("website", e.target.value)}
        placeholder="https://www.yourcompany.com"
      />
    </div>
    <div>
      <Label htmlFor="socials">Social Media Links</Label>
      <Textarea
        id="socials"
        value={formData.socials}
        onChange={(e) => updateFormData("socials", e.target.value)}
        placeholder="Facebook, Instagram, Twitter, etc."
        rows={2}
      />
    </div>
    <div>
      <Label htmlFor="export_import_exp">Export/Import Experience</Label>
      <Textarea
        id="export_import_exp"
        value={formData.export_import_exp}
        onChange={(e) => updateFormData("export_import_exp", e.target.value)}
        placeholder="Describe your international trade experience"
        rows={3}
      />
    </div>
  </div>
);

// 8. Updated BusinessInterests component with error handling
const BusinessInterests = ({
  formData,
  updateFormData,
  errors,
}: StepComponentProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="purpose">Purpose of Participation *</Label>
      <Textarea
        id="purpose"
        value={formData.purpose}
        onChange={(e) => updateFormData("purpose", e.target.value)}
        placeholder="e.g., find buyers, suppliers, partners, investors"
        rows={3}
        className={errors.purpose ? "border-red-500" : ""}
      />
      {errors.purpose && (
        <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
      )}
    </div>
    <div>
      <Label htmlFor="target_market">Target Markets or Regions *</Label>
      <Textarea
        id="target_market"
        value={formData.target_market}
        onChange={(e) => updateFormData("target_market", e.target.value)}
        placeholder="Which markets or regions are you interested in?"
        rows={2}
        className={errors.target_market ? "border-red-500" : ""}
      />
      {errors.target_market && (
        <p className="text-red-500 text-xs mt-1">{errors.target_market}</p>
      )}
    </div>
    <div>
      <Label htmlFor="type_of_partner">Type of Partners Sought *</Label>
      <Textarea
        id="type_of_partner"
        value={formData.type_of_partner}
        onChange={(e) => updateFormData("type_of_partner", e.target.value)}
        placeholder="What type of business partners are you looking for?"
        rows={2}
        className={errors.type_of_partner ? "border-red-500" : ""}
      />
      {errors.type_of_partner && (
        <p className="text-red-500 text-xs mt-1">{errors.type_of_partner}</p>
      )}
    </div>
    <div>
      <Label htmlFor="investment_interest">Investment Interests</Label>
      <Textarea
        id="investment_interest"
        value={formData.investment_interest}
        onChange={(e) => updateFormData("investment_interest", e.target.value)}
        placeholder="Describe your investment interests or needs"
        rows={3}
      />
    </div>
  </div>
);

const DocumentsConsent = ({
  formData,
  updateFormData,
  errors,
  onFileSelect,
  uploadedFile,
}: StepComponentProps & {
  onFileSelect: (file: File | null) => void;
  uploadedFile: File | null;
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-4">Supporting Documents</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please attach the following if available:
      </p>
      <div className="space-y-3">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
            uploadedFile
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            id="document-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              onFileSelect(file);
            }}
          />
          <label htmlFor="document-upload" className="cursor-pointer">
            {uploadedFile ? (
              <>
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-green-700 mb-1">
                  File attached successfully!
                </p>
                <p className="text-sm text-green-600 font-medium break-all px-4">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Click to replace file
                </p>
              </>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Company Brochure, Product Catalog, Business Registration,
                  Pitch Deck
                </p>
              </>
            )}
          </label>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">PDPA Consent (Required)</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-700 mb-3">
          By submitting this registration form, you acknowledge and agree to the
          collection, use, and disclosure of your personal data by RGL Icon
          Organizers for:
        </p>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-3">
          <li>Processing your registration</li>
          <li>Providing event-related services</li>
          <li>Communicating important updates related to your participation</li>
        </ul>
        <p className="text-sm text-gray-700">
          Your data may be shared with third-party service providers solely for
          event services delivery.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="pdpaConsent"
          checked={formData.pdpaConsent}
          onCheckedChange={(checked) => updateFormData("pdpaConsent", checked)}
          className={errors.pdpaConsent ? "border-red-500" : ""}
        />
        <Label htmlFor="pdpaConsent" className="text-sm">
          YES, I agree to the PDPA consent statement *
        </Label>
      </div>
      {errors.pdpaConsent && (
        <p className="text-red-500 text-xs mt-1">{errors.pdpaConsent}</p>
      )}
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">
        Marketing Communications (Optional)
      </h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketingConsent"
            checked={formData.marketingConsent}
            onCheckedChange={(checked) =>
              updateFormData("marketingConsent", checked)
            }
          />
          <Label htmlFor="marketingConsent" className="text-sm">
            I consent to sharing my data with event sponsors for marketing
            purposes
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="promotionalConsent"
            checked={formData.promotionalConsent}
            onCheckedChange={(checked) =>
              updateFormData("promotionalConsent", checked)
            }
          />
          <Label htmlFor="promotionalConsent" className="text-sm">
            I would like to receive marketing communications from RGL Icon
            Organizers
          </Label>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        You may withdraw consent anytime by contacting: rglicon2025@gmail.com
      </p>
    </div>
  </div>
);

const RegistrationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const package_id = searchParams.get("package");
  const price = searchParams.get("price");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  console.log("Package ID:", package_id);
  console.log("Price:", price);
  const [formData, setFormData] = useState({
    // Basic Information
    full_name: "",
    region: "",
    club_name: "",
    national_president: "",
    eagle_id: "",
    job_title: "",
    company_name: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    linkedin: "",
    other_links: "",
    date_of_arrival: "",
    departure: "",
    dietary_restrictions: "",

    // Company Profile
    industrySector: "", // This will map to industry sector (not in API)
    company_size: "",
    products_offered: "",
    website: "",
    socials: "",
    export_import_exp: "",

    // Business Interests
    purpose: "",
    target_market: "",
    type_of_partner: "",
    investment_interest: "",

    // Additional fields
    document_link: "",
    isPaid: false,

    // Consent (keep these for form validation)
    pdpaConsent: false,
    marketingConsent: false,
    promotionalConsent: false,

    // Required by FormData interface
    ticket_type: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Personal and contact details",
    },
    { id: 2, title: "Company Profile", description: "Business information" },
    {
      id: 3,
      title: "Business Interests",
      description: "Partnership and investment goals",
    },
    {
      id: 4,
      title: "Documents & Consent",
      description: "Supporting documents and agreements",
    },
  ];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/selecting
    clearError(field);
  };

  const nextStep = () => {
    if (validateStep(currentStep, formData, setErrors)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        setErrors({}); // Clear errors when moving to next step
      }
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.id < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : step.id === currentStep
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-500"
              }`}
            >
              {step.id < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.id
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-gray-600">{steps[currentStep - 1].description}</p>
      </div>
    </div>
  );

  const renderStep = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <CompanyProfile
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <BusinessInterests
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <DocumentsConsent
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            onFileSelect={setUploadedFile}
            uploadedFile={uploadedFile}
          />
        );
      default:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
    }
  };

  const validateStep = (
    step: number,
    formData: FormData,
    setErrors: (errors: Record<string, string>) => void
  ): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Information
        if (!formData.full_name.trim())
          newErrors.full_name = "Full name is required";
        if (!formData.region.trim()) newErrors.region = "Region is required";
        if (!formData.date_of_arrival.trim())
          newErrors.date_of_arrival = "Flight date of arrival is required";
        if (!formData.departure.trim())
          newErrors.departure = "Flight date of departure is required";
        if (!formData.job_title.trim())
          newErrors.job_title = "Job title is required";
        if (!formData.company_name.trim())
          newErrors.company_name = "Company name is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        if (!formData.dietary_restrictions.trim())
          newErrors.dietary_restrictions =
            "Dietary restrictions information is required";
        break;

      case 2: // Company Profile
        if (!formData.company_size.trim())
          newErrors.company_size = "Company size is required";
        if (!formData.products_offered.trim())
          newErrors.products_offered =
            "Products/services description is required";
        break;

      case 3: // Business Interests
        if (!formData.purpose.trim())
          newErrors.purpose = "Purpose of participation is required";
        if (!formData.target_market.trim())
          newErrors.target_market = "Target market is required";
        if (!formData.type_of_partner.trim())
          newErrors.type_of_partner = "Type of partners sought is required";
        break;

      case 4: // Documents & Consent
        if (!formData.pdpaConsent)
          newErrors.pdpaConsent = "PDPA consent is required to proceed";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      let documentId = formData.document_link;

      // Upload document if file is selected and not yet uploaded
      if (uploadedFile && !documentId) {
        // Check if eagle_id exists
        if (!formData.eagle_id.trim()) {
          setErrors({ eagle_id: "Eagle ID is required to upload documents" });
          return;
        }

        setIsUploading(true);
        const uploadResult = await uploadDocument(
          uploadedFile,
          formData.eagle_id
        );
        setIsUploading(false);

        // Get the document_id from upload result
        if (uploadResult && uploadResult.data?.document_id) {
          documentId = uploadResult.data.document_id;
        }
      }

      // Prepare data for API
      const apiData = {
        date_of_arrival: formData.date_of_arrival,
        departure: formData.departure,
        document_link: documentId, // Use the uploaded documentId
        purpose: formData.purpose,
        target_market: formData.target_market,
        type_of_partner: formData.type_of_partner,
        investment_interest: formData.investment_interest,
        company_size: formData.company_size,
        products_offered: formData.products_offered,
        website: formData.website,
        socials: formData.socials,
        export_import_exp: formData.export_import_exp,
        full_name: formData.full_name,
        club_name: formData.club_name,
        eagle_id: formData.eagle_id,
        company_name: formData.company_name,
        email: formData.email,
        region: formData.region,
        dietary_restrictions: formData.dietary_restrictions,
        ticket_type: package_id ?? "",
        job_title: formData.job_title,
        country: formData.country,
        city: formData.city,
        phone: formData.phone,
        linkedin: formData.linkedin,
        other_links: formData.other_links,
        isPaid: true,
      };

      const result = await addAttendance(apiData);
      if (result?.error) {
        const errorMessage = encodeURIComponent(
          result.message || "Registration failed"
        );
        router.push(
          `/events/rglicon2025/success?status=error&message=${errorMessage}`
        );
        return;
      }

      // Success - redirect with eagle_id
      router.push(
        `/events/rglicon2025/success?status=success&eagle_id=${encodeURIComponent(formData.eagle_id)}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = encodeURIComponent(
        "An unexpected error occurred. Please try again."
      );
      router.push(
        `/events/rglicon2025/success?status=error&message=${errorMessage}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 text-white overflow-hidden p-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300 mb-2">
            RGL ICON Convention 2025
          </h1>
          <p className="text-white-600">
            Complete your registration in {steps.length} simple steps
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <StepIndicator />
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center"
                  disabled={
                    (currentStep === 4 && !formData.pdpaConsent) || isUploading
                  }
                >
                  {isUploading ? "Uploading..." : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                  disabled={!formData.pdpaConsent || isUploading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isUploading ? "Uploading..." : "Submit"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;

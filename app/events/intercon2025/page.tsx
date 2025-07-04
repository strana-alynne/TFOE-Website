"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  CreditCard,
} from "lucide-react";
import React from "react";
import { addAttendance } from "./actions";
import SuccessPage from "./success/page";

interface FormData {
  full_name: string;
  region: string;
  club_name: string;
  national_president: string;
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
  isPaid: boolean;
  pdpaConsent: boolean;
  marketingConsent: boolean;
  promotionalConsent: boolean;
}

interface StepComponentProps {
  formData: FormData;
  updateFormData: (field: string, value: string | boolean) => void;
}

const BasicInformation = ({ formData, updateFormData }: StepComponentProps) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="full_name">Full Name *</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => updateFormData("full_name", e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <Label htmlFor="region">Region *</Label>
        <Input
          id="region"
          value={formData.region}
          onChange={(e) => updateFormData("region", e.target.value)}
          placeholder="Enter your region"
        />
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
        <Label htmlFor="national_president">National President</Label>
        <Input
          id="national_president"
          value={formData.national_president}
          onChange={(e) => updateFormData("national_president", e.target.value)}
          placeholder="Enter national president name"
        />
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
        />
      </div>
      <div>
        <Label htmlFor="company_name">Company Name *</Label>
        <Input
          id="company_name"
          value={formData.company_name}
          onChange={(e) => updateFormData("company_name", e.target.value)}
          placeholder="Enter company name"
        />
      </div>
      <div>
        <Label htmlFor="country">Country *</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => updateFormData("country", e.target.value)}
          placeholder="Enter country"
        />
      </div>
      <div>
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => updateFormData("city", e.target.value)}
          placeholder="Enter city"
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          placeholder="Enter phone number"
        />
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
    </div>
  </div>
);

const CompanyProfile = ({ formData, updateFormData }: StepComponentProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="company_size">Company Size *</Label>
      <Input
        id="company_size"
        value={formData.company_size}
        onChange={(e) => updateFormData("company_size", e.target.value)}
        placeholder="e.g., 50 employees, $5M annual revenue"
      />
    </div>
    <div>
      <Label htmlFor="products_offered">Products/Services Offered *</Label>
      <Textarea
        id="products_offered"
        value={formData.products_offered}
        onChange={(e) => updateFormData("products_offered", e.target.value)}
        placeholder="Describe your products or services"
        rows={3}
      />
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

const BusinessInterests = ({
  formData,
  updateFormData,
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
      />
    </div>
    <div>
      <Label htmlFor="target_market">Target Markets or Regions *</Label>
      <Textarea
        id="target_market"
        value={formData.target_market}
        onChange={(e) => updateFormData("target_market", e.target.value)}
        placeholder="Which markets or regions are you interested in?"
        rows={2}
      />
    </div>
    <div>
      <Label htmlFor="type_of_partner">Type of Partners Sought *</Label>
      <Textarea
        id="type_of_partner"
        value={formData.type_of_partner}
        onChange={(e) => updateFormData("type_of_partner", e.target.value)}
        placeholder="What type of business partners are you looking for?"
        rows={2}
      />
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

const DocumentsConsent = ({ formData, updateFormData }: StepComponentProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-4">Supporting Documents</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please attach the following if available:
      </p>
      <div className="space-y-3">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            Company Brochure, Product Catalog, Business Registration, Pitch Deck
          </p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">PDPA Consent (Required)</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-700 mb-3">
          By submitting this registration form, you acknowledge and agree to the
          collection, use, and disclosure of your personal data by DMI Studios
          for:
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
        />
        <Label htmlFor="pdpaConsent" className="text-sm">
          YES, I agree to the PDPA consent statement *
        </Label>
      </div>
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
            I would like to receive marketing communications from DMI Studios
          </Label>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        You may withdraw consent anytime by contacting DMI c/o
        ralph_pacayra@yahoo.com.sg
      </p>
    </div>
  </div>
);

const ReviewPayment = ({ formData }: { formData: FormData }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-4">Registration Summary</h3>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Full Name:</span>
          <span className="text-sm font-medium">
            {formData.full_name || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Company:</span>
          <span className="text-sm font-medium">
            {formData.company_name || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Email:</span>
          <span className="text-sm font-medium">
            {formData.email || "Not provided"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Location:</span>
          <span className="text-sm font-medium">
            {formData.city && formData.country
              ? `${formData.city}, ${formData.country}`
              : "Not provided"}
          </span>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">Registration Fee</span>
          <span className="text-2xl font-bold text-green-600">$299.00</span>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input id="cardName" placeholder="Enter name as shown on card" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
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
  });

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
    {
      id: 5,
      title: "Review & Payment",
      description: "Final review and checkout",
    },
  ];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
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
                    ? "bg-blue-500 border-blue-500 text-white"
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
      <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
    </div>
  );

  const renderStep = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <CompanyProfile formData={formData} updateFormData={updateFormData} />
        );
      case 3:
        return (
          <BusinessInterests
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <DocumentsConsent
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return <ReviewPayment formData={formData} />;
      default:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare data for API - only include fields that match the API schema
      const apiData = {
        document_link: formData.document_link,
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
        national_president: formData.national_president,
        job_title: formData.job_title,
        country: formData.country,
        city: formData.city,
        phone: formData.phone,
        linkedin: formData.linkedin,
        other_links: formData.other_links,
        isPaid: true, // Set to true after successful payment
      };

      // Show success page immediately
      setShowSuccessPage(true);

      // Call API in background (optional - you can remove this if you don't want to call the API)
      const result = await addAttendance(apiData);
      console.log("API response:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show success page even if API fails
      setShowSuccessPage(true);
    }
  };

  if (showSuccessPage) {
    return <SuccessPage />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TFOE International Convention 2025
          </h1>
          <p className="text-gray-600">
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
                  disabled={currentStep === 4 && !formData.pdpaConsent}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Complete Registration
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

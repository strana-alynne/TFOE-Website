"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  QrCode,
  Eye,
  Users,
  UserCheck,
  Filter,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";

// Sample data - replace with your actual data
const sampleParticipants = [
  {
    id: 1,
    full_name: "John Smith",
    eagle_id: "EG001",
    company_name: "Tech Solutions Inc",
    email: "john@techsolutions.com",
    phone: "+1234567890",
    city: "New York",
    country: "USA",
    job_title: "CEO",
    club_name: "NYC Business Club",
    region: "North America",
    isPaid: true,
    attended: true,
    document_link: "https://example.com/doc1",
    purpose: "Networking and partnerships",
    target_market: "B2B Software",
    type_of_partner: "Technology Partner",
    investment_interest: "Series A",
    company_size: "50-100 employees",
    products_offered: "CRM Software, Analytics Tools",
    website: "https://techsolutions.com",
    socials: "@techsolutions",
    export_import_exp: "5 years",
    national_president: "Sarah Johnson",
    linkedin: "https://linkedin.com/in/johnsmith",
    other_links: "https://github.com/johnsmith",
  },
  {
    id: 2,
    full_name: "Maria Garcia",
    eagle_id: "523370",
    company_name: "Global Imports Ltd",
    email: "maria@globalimports.com",
    phone: "+1987654321",
    city: "Los Angeles",
    country: "USA",
    job_title: "Import Manager",
    club_name: "LA Trade Association",
    region: "West Coast",
    isPaid: true,
    attended: false,
    document_link: "https://example.com/doc2",
    purpose: "International trade expansion",
    target_market: "Consumer goods",
    type_of_partner: "Distribution Partner",
    investment_interest: "",
    company_size: "20-50 employees",
    products_offered: "Import/Export services",
    website: "https://globalimports.com",
    socials: "@globalimports",
    export_import_exp: "10 years",
    national_president: "Michael Chen",
    linkedin: "https://linkedin.com/in/mariagarcia",
    other_links: "",
  },
  {
    id: 3,
    full_name: "David Kim",
    eagle_id: "EG003",
    company_name: "Innovation Hub",
    email: "david@innovationhub.com",
    phone: "+1555000111",
    city: "San Francisco",
    country: "USA",
    job_title: "CTO",
    club_name: "Silicon Valley Entrepreneurs",
    region: "California",
    isPaid: false,
    attended: true,
    document_link: "https://example.com/doc3",
    purpose: "Technology partnerships",
    target_market: "Startups and SMEs",
    type_of_partner: "Technology Partner",
    investment_interest: "Seed funding",
    company_size: "10-20 employees",
    products_offered: "AI solutions, Cloud services",
    website: "https://innovationhub.com",
    socials: "@innovationhub",
    export_import_exp: "2 years",
    national_president: "Lisa Wong",
    linkedin: "https://linkedin.com/in/davidkim",
    other_links: "https://github.com/innovationhub",
  },
];

type Participant = (typeof sampleParticipants)[number];

const AdminAttendanceDashboard = () => {
  const [participants, setParticipants] = useState(sampleParticipants);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [eagleIdFilter, setEagleIdFilter] = useState("");
  type ScanResult = {
    success: boolean;
    participant?: Participant;
    message: string;
  } | null;

  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = participants.length;
    const attended = participants.filter((p) => p.attended).length;
    const paid = participants.filter((p) => p.isPaid).length;

    return { total, attended, paid };
  }, [participants]);

  // Filter participants
  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const matchesName = participant.full_name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesEagleId = participant.eagle_id
        .toLowerCase()
        .includes(eagleIdFilter.toLowerCase());
      return matchesName && matchesEagleId;
    });
  }, [participants, nameFilter, eagleIdFilter]);

  const openModal = (participant: Participant) => {
    setSelectedParticipant(participant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  const openQRScanner = () => {
    setShowQRScanner(true);
    setScanResult(null);
    setScanError(null);
    setIsScanning(true);
  };

  const closeQRScanner = () => {
    setShowQRScanner(false);
    setIsScanning(false);
    setScanResult(null);
    setScanError(null);
  };

  const handleQRScan = (detectedCodes: any[]) => {
    try {
      if (!detectedCodes || detectedCodes.length === 0) {
        return;
      }
      // Get the first detected QR code value
      const result = detectedCodes[0]?.rawValue || detectedCodes[0]?.value;
      if (!result) {
        setScanError("No QR code value detected.");
        setIsScanning(false);
        return;
      }

      let participantData;

      // Try to parse as JSON first (if QR contains full participant data)
      try {
        participantData = JSON.parse(result);
      } catch {
        // If not JSON, treat as Eagle ID
        participantData = { eagle_id: result };
      }

      // Find participant by Eagle ID
      const participant = participants.find(
        (p) => p.eagle_id === participantData.eagle_id || p.eagle_id === result
      );

      if (participant) {
        // Mark as attended
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === participant.id ? { ...p, attended: true } : p
          )
        );

        setScanResult({
          success: true,
          participant: participant,
          message: `Successfully marked ${participant.full_name} as attended!`,
        });
      } else {
        setScanResult({
          success: false,
          message: `Participant with Eagle ID "${participantData.eagle_id || result}" not found.`,
        });
      }

      setIsScanning(false);
    } catch (error) {
      console.error("QR Scan error:", error);
      setScanError("Failed to process QR code. Please try again.");
      setIsScanning(false);
    }
  };

  const handleScanError = (error: any) => {
    console.error("QR Scanner error:", error);
    setScanError("Failed to access camera. Please check permissions.");
    setIsScanning(false);
  };

  const clearFilters = () => {
    setNameFilter("");
    setEagleIdFilter("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Attendance Dashboard
          </h1>
          <p className="text-gray-600">Manage and track event participants</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Participants
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Attended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.attended}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">$</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by Eagle ID..."
                  value={eagleIdFilter}
                  onChange={(e) => setEagleIdFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {(nameFilter || eagleIdFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>

            <button
              onClick={openQRScanner}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <QrCode className="h-4 w-4" />
              Scan QR Code
            </button>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eagle ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {participant.full_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {participant.eagle_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {participant.company_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.job_title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          participant.attended
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {participant.attended ? "Attended" : "Not Attended"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          participant.isPaid
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {participant.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => openModal(participant)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No participants found matching your filters.
              </p>
            </div>
          )}
        </div>

        {/* Participant Details Modal */}
        {showModal && selectedParticipant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Participant Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Full Name
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.full_name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Eagle ID
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.eagle_id}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Email
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Phone
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Location
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.city},{" "}
                          {selectedParticipant.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Company Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Company Name
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.company_name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Job Title
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.job_title}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Company Size
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.company_size}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Products Offered
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.products_offered}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Website
                        </label>
                        <a
                          href={selectedParticipant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedParticipant.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Business Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Purpose
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.purpose}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Target Market
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.target_market}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Partner Type
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.type_of_partner}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Export/Import Experience
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.export_import_exp}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Club & Status
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Club Name
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.club_name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Region
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.region}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          National President
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.national_president}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Payment Status
                        </label>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedParticipant.isPaid
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {selectedParticipant.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Attendance Status
                        </label>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedParticipant.attended
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedParticipant.attended
                            ? "Attended"
                            : "Not Attended"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedParticipant.linkedin && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Additional Links
                    </h3>
                    <div className="space-y-2">
                      <a
                        href={selectedParticipant.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 block"
                      >
                        LinkedIn Profile
                      </a>
                      {selectedParticipant.other_links && (
                        <a
                          href={selectedParticipant.other_links}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 block"
                        >
                          Other Links
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    QR Code Scanner
                  </h2>
                  <button
                    onClick={closeQRScanner}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Scanner Result Display */}
                {scanResult && (
                  <div
                    className={`mb-4 p-4 rounded-lg border ${
                      scanResult.success
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {scanResult.success ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <span className="font-medium">
                        {scanResult.success ? "Success!" : "Not Found"}
                      </span>
                    </div>
                    <p className="text-sm">{scanResult.message}</p>
                    {scanResult.participant && (
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Name:</strong>{" "}
                          {scanResult.participant.full_name}
                        </p>
                        <p>
                          <strong>Eagle ID:</strong>{" "}
                          {scanResult.participant.eagle_id}
                        </p>
                        <p>
                          <strong>Company:</strong>{" "}
                          {scanResult.participant.company_name}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Error Display */}
                {scanError && (
                  <div className="mb-4 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Error</span>
                    </div>
                    <p className="text-sm mt-1">{scanError}</p>
                  </div>
                )}

                {/* QR Scanner */}
                {isScanning && (
                  <div className="mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <Scanner
                        onScan={handleQRScan}
                        onError={handleScanError}
                        constraints={{
                          facingMode: "environment", // Use back camera
                        }}
                        scanDelay={1000} // Scan every 1 second
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Position the QR code within the frame to scan
                    </p>
                  </div>
                )}

                {/* Start Scanning Button */}
                {!isScanning && !scanResult && (
                  <div className="text-center">
                    <div className="mx-auto w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      Ready to scan QR codes for attendance
                    </p>
                    <button
                      onClick={() => setIsScanning(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Camera className="h-4 w-4" />
                      Start Scanning
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  {scanResult && (
                    <button
                      onClick={() => {
                        setScanResult(null);
                        setScanError(null);
                        setIsScanning(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Scan Another
                    </button>
                  )}
                  <button
                    onClick={closeQRScanner}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendanceDashboard;

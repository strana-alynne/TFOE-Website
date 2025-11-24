"use client";
import React, { useState, useMemo, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { getDetails } from "../actions";
import { checkAttendance } from "../actions";

type Participant = {
  id: number;
  full_name: string;
  eagle_id: string;
  company_name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  job_title: string;
  club_name: string;
  region: string;
  isPaid: boolean;
  attended: boolean;
  ticket_type: string;
  document_link: string;
  purpose: string;
  target_market: string;
  type_of_partner: string;
  investment_interest: string;
  company_size: string;
  products_offered: string;
  website: string;
  socials: string;
  export_import_exp: string;
  linkedin: string;
  other_links: string;
};

const AdminAttendanceDashboard = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [eagleIdFilter, setEagleIdFilter] = useState("");
  const [isCheckingAttendance, setIsCheckingAttendance] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  type ScanResult = {
    success: boolean;
    participant?: Participant;
    message: string;
  } | null;

  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        setError(null);

        // You need to get the token from your auth system
        // This is just an example - replace with your actual token retrieval method
        const result = await getDetails();

        if (result.data) {
          // Assuming the API returns an array of participants
          // You may need to adjust this based on your actual API response structure
          setParticipants(Array.isArray(result.data) ? result.data : []);
        } else if (result.message) {
          setError(result.message);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch participants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = participants.length;
    const attended = participants.filter((p) => p.attended).length;
    const paid = participants.filter((p) => p.isPaid).length;

    return { total, attended, paid };
  }, [participants]);

  // Filter participants
  const filteredParticipants = useMemo(() => {
    const filtered = participants.filter((participant) => {
      const matchesName = participant.full_name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesEagleId = participant.eagle_id
        .toLowerCase()
        .includes(eagleIdFilter.toLowerCase());
      return matchesName && matchesEagleId;
    });

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filtered.slice(startIndex, endIndex);
  }, [participants, nameFilter, eagleIdFilter, currentPage]);

  // Total filtered count for pagination
  const totalFiltered = useMemo(() => {
    return participants.filter((participant) => {
      const matchesName = participant.full_name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const matchesEagleId = participant.eagle_id
        .toLowerCase()
        .includes(eagleIdFilter.toLowerCase());
      return matchesName && matchesEagleId;
    }).length;
  }, [participants, nameFilter, eagleIdFilter]);

  const totalPages = Math.ceil(totalFiltered / itemsPerPage);

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
    setIsCheckingAttendance(false);
    setScanResult(null);
    setScanError(null);
  };

  const handleQRScan = async (detectedCodes: any[]) => {
    try {
      if (!detectedCodes || detectedCodes.length === 0) {
        return;
      }

      // Get the first detected QR code value
      const firstCode = detectedCodes[0];
      console.log("First detected code object:", firstCode);

      // Try different properties that might contain the QR code value
      const result =
        firstCode?.rawValue ||
        firstCode?.value ||
        firstCode?.text ||
        firstCode?.data ||
        firstCode;

      const eagleId = typeof result === "string" ? result : JSON.parse(result);
      console.log("Eagle ID:", eagleId);

      // Find participant by eagle_id
      const foundParticipant = participants.find((p) => p.eagle_id === eagleId);

      if (!foundParticipant) {
        setScanResult({
          success: false,
          message: `Participant with Eagle ID "${eagleId}" not found.`,
        });
        setIsScanning(false);
        return;
      }

      // Check if already attended
      if (foundParticipant.attended) {
        setScanResult({
          success: false,
          message: `${foundParticipant.full_name} has already been marked as attended.`,
        });
        setIsScanning(false);
        return;
      }

      setIsScanning(false);
      setIsCheckingAttendance(true);

      // Call the checkAttendance API with eagle ID
      const attendanceResult = await checkAttendance(eagleId);

      if (attendanceResult.error) {
        setScanResult({
          success: false,
          message: `Failed to mark attendance: ${attendanceResult.message}`,
        });
      } else {
        // UPDATE LOCAL STATE - This is the critical fix
        setParticipants((prevParticipants) =>
          prevParticipants.map((p) =>
            p.eagle_id === eagleId ? { ...p, attended: true } : p
          )
        );

        setScanResult({
          success: true,
          participant: { ...foundParticipant, attended: true },
          message: `Successfully marked ${foundParticipant.full_name} as attended!`,
        });
      }
    } catch (error) {
      console.error("QR Scan error:", error);
      setScanError("Failed to process QR code. Please try again.");
      setIsScanning(false);
    } finally {
      setIsCheckingAttendance(false);
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
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading participants...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                    Ticket Type
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
                      <span className="text-sm text-gray-900">
                        {participant.ticket_type}
                      </span>
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
          {/* Pagination Controls */}
          {totalFiltered > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalFiltered)}
                </span>{" "}
                of <span className="font-medium">{totalFiltered}</span> results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, idx, arr) => (
                      <React.Fragment key={page}>
                        {idx > 0 && arr[idx - 1] !== page - 1 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded-md text-sm font-medium ${
                            currentPage === page
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
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
                          Ticket Type
                        </label>
                        <p className="text-gray-900">
                          {selectedParticipant.ticket_type}
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
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Document
                        </label>
                        {selectedParticipant.document_link ? (
                          <a
                            href={selectedParticipant.document_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            Download Document
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </a>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No document available
                          </p>
                        )}
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

                {isCheckingAttendance && (
                  <div className="mb-4 p-4 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Checking attendance...</p>
                  </div>
                )}

                {/* Start Scanning Button */}
                {!isScanning && !scanResult && !isCheckingAttendance && (
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

"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Mail,
  Calendar,
  MapPin,
  Users,
  AlertTriangle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { closeCheckout } from "../actions";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status") || "success";
  const message = searchParams.get("message");
  const eagle_id = searchParams.get("eagle_id");

  const [isProcessing, setIsProcessing] = useState(false);
  const [closeCheckoutError, setCloseCheckoutError] = useState<string | null>(
    null
  );
  const [attendanceRecorded, setAttendanceRecorded] = useState(false);

  const isSuccess = status === "success";

  // Call closeCheckout when component mounts and we have success
  useEffect(() => {
    const recordAttendance = async () => {
      if (isSuccess && eagle_id && !attendanceRecorded && !isProcessing) {
        setIsProcessing(true);

        try {
          const result = await closeCheckout(eagle_id);

          if (result.error) {
            setCloseCheckoutError(result.message);
            console.error("Failed to record attendance:", result);
          } else {
            setAttendanceRecorded(true);
            console.log("Attendance recorded successfully:", result.data);
          }
        } catch (error) {
          setCloseCheckoutError("Failed to record attendance");
          console.error("Error recording attendance:", error);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    recordAttendance();
  }, [isSuccess, eagle_id, attendanceRecorded, isProcessing]);

  const bgGradient = isSuccess
    ? "from-green-50 to-emerald-100"
    : "from-red-50 to-red-100";

  const iconBg = isSuccess ? "bg-green-100" : "bg-red-100";
  const iconColor = isSuccess ? "text-green-600" : "text-red-600";
  const titleColor = isSuccess ? "text-gray-900" : "text-red-900";
  const subtitleColor = isSuccess ? "text-gray-600" : "text-red-700";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} py-8`}>
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className={`${iconBg} rounded-full p-6`}>
                {isSuccess ? (
                  <CheckCircle className={`w-16 h-16 ${iconColor}`} />
                ) : (
                  <XCircle className={`w-16 h-16 ${iconColor}`} />
                )}
              </div>
            </div>
            <h1 className={`text-3xl font-bold ${titleColor} mb-2`}>
              {isSuccess ? "Registration Successful!" : "Registration Failed"}
            </h1>
            <p className={`text-lg ${subtitleColor}`}>
              {isSuccess
                ? "Thank you for registering for TFOE International Convention 2025"
                : message ||
                  "There was an issue processing your registration. Please try again."}
            </p>

            {isProcessing && (
              <div className="flex items-center justify-center mt-4">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span className="text-sm text-gray-600">
                  Finalizing registration...
                </span>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            {closeCheckoutError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Attendance Recording Issue
                    </p>
                    <p className="text-sm text-yellow-700">
                      Your registration was successful, but we couldn't
                      automatically finalize your attendance record. Please
                      contact support if needed. Error: {closeCheckoutError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isSuccess ? (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                    What happens next?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Confirmation Email
                        </p>
                        <p className="text-sm text-green-700">
                          You'll receive a confirmation email with your
                          registration details within the next few minutes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Event Schedule
                        </p>
                        <p className="text-sm text-green-700">
                          Detailed event schedule and agenda will be sent to you
                          2 weeks before the convention.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Venue Information
                        </p>
                        <p className="text-sm text-green-700">
                          Venue details, accommodation recommendations, and
                          travel information will be provided closer to the
                          event date.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Networking Opportunities
                        </p>
                        <p className="text-sm text-green-700">
                          Access to attendee directory and networking platform
                          will be available 1 week before the event.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Event Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Event Name
                      </p>
                      <p className="text-sm text-blue-700">
                        TFOE International Convention 2025
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Status
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-blue-700">Confirmed</p>
                        {attendanceRecorded && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Registration Date
                      </p>
                      <p className="text-sm text-blue-700">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    {eagle_id && (
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Eagle ID
                        </p>
                        <p className="text-sm text-blue-700">{eagle_id}</p>
                      </div>
                    )}
                  </div>
                </div>

                {eagle_id && (
                  <div
                    className={`${attendanceRecorded ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"} border rounded-lg p-4`}
                  >
                    <div className="flex items-center space-x-2">
                      {attendanceRecorded ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : isProcessing ? (
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      )}
                      <p
                        className={`text-sm font-medium ${attendanceRecorded ? "text-green-800" : isProcessing ? "text-blue-800" : "text-yellow-800"}`}
                      >
                        {attendanceRecorded
                          ? "Registration Finalized Successfully"
                          : isProcessing
                            ? "Finalizing Registration..."
                            : "Processing Registration"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">
                    What went wrong?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Registration Issue
                        </p>
                        <p className="text-sm text-red-700">
                          {message ||
                            "There was a problem processing your registration."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                    What can you do?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <RefreshCw className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Try Again
                        </p>
                        <p className="text-sm text-yellow-700">
                          Click the "Try Again" button below to return to the
                          registration form.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Contact Support
                        </p>
                        <p className="text-sm text-yellow-700">
                          If the problem persists, please contact our support
                          team using the information below.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Need Help?
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  {isSuccess
                    ? "If you have any questions about your registration or the event, please don't hesitate to contact us:"
                    : "If you continue to experience issues or have questions, please contact our support team:"}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    Email: rglicon@gmail.com
                  </p>
                  <p className="text-sm text-gray-700">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              {isSuccess ? (
                <Button
                  className="flex items-center bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push("/events/rglicon2025")}
                  disabled={isProcessing}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Return to Home
                </Button>
              ) : (
                <>
                  <Button
                    className="flex items-center bg-red-600 hover:bg-red-700"
                    onClick={() => router.back()}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => router.push("/events/rglicon2025")}
                  >
                    Return to Home
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ResultPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading...</span>
        </div>
      }
    >
      <SuccessPage />
    </Suspense>
  );
};

export default ResultPage;

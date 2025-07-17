"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Calendar, MapPin, Users } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for registering for TFOE International Convention 2025
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Confirmation Details */}
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
                      You'll receive a confirmation email with your registration
                      details and receipt within the next few minutes.
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
                      Detailed event schedule and agenda will be sent to you 2
                      weeks before the convention.
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
                      Venue details, accommodation recommendations, and travel
                      information will be provided closer to the event date.
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
                      Access to attendee directory and networking platform will
                      be available 1 week before the event.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
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
                    Registration Fee
                  </p>
                  <p className="text-sm text-blue-700">$299.00</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Status</p>
                  <p className="text-sm text-blue-700">Confirmed & Paid</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Registration Date
                  </p>
                  <p className="text-sm text-blue-700">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Need Help?
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  If you have any questions about your registration or the
                  event, please don't hesitate to contact us:
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    Email: ralph_pacayra@yahoo.com.sg
                  </p>
                  <p className="text-sm text-gray-700">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                className="flex items-center bg-blue-600 hover:bg-blue-700"
                onClick={() => (window.location.href = "/")}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;

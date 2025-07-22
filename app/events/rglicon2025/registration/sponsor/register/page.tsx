import { Suspense } from "react";
import RegistrationForm from "./registrationForm";

export default function SponsorRegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}

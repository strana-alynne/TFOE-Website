import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import SignupForm from "./SignUpForm";

const SIGNUP_QUERY = defineQuery(`*[_type == "loginandSignupsection"]{
  
  SignUpImage {
    asset -> {
      url
    }
  },
 
}`);

const LOGO_QUERY = defineQuery(`*[_type == "logo"]{
  Logo{
    asset->{
        url
        }
      },
}`);

export default async function Signup() {
  const { data: signup } = await sanityFetch({ query: SIGNUP_QUERY });
  const { data: logo } = await sanityFetch({ query: LOGO_QUERY });

  const logoImage = logo?.[0]?.Logo?.asset?.url || "/fallback-logo.png";
  const SignUpImage =
    signup?.[0]?.SignUpImage?.asset?.url || "/fallback-bg.png";

  console.log("logoImage", logoImage);
  console.log("loginImage", SignUpImage);

  return <SignupForm image={SignUpImage} logo={logoImage} />;
}

import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import LoginForm from "./LoginForm";

const LOGIN_QUERY = defineQuery(`*[_type == "loginandSignupsection"]{
  
  LoginImage {
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
export default async function Login() {
  const { data: login } = await sanityFetch({ query: LOGIN_QUERY });
  const { data: logo } = await sanityFetch({ query: LOGO_QUERY });

  const logoImage = logo?.[0]?.Logo?.asset?.url || "/fallback-logo.png";
  const loginImage = login?.[0]?.LoginImage?.asset?.url || "/fallback-bg.png";

  console.log("logoImage", logoImage);
  console.log("loginImage", loginImage);

  return (
    <div>
      <LoginForm image={loginImage} logo={logoImage} />
    </div>
  );
}

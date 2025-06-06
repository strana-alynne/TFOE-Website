import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import PreRegForm from "./pre-reg";

const PREREG_QUERY = defineQuery(`*[_type == "loginandSignupsection"]{
  
  PreRegImage{ 
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

export default async function PreReg() {
  const { data: signup } = await sanityFetch({ query: PREREG_QUERY });
  const { data: logo } = await sanityFetch({ query: LOGO_QUERY });

  const logoImage = logo?.[0]?.Logo?.asset?.url || "/fallback-logo.png";
  const PreRegImage =
    signup?.[0]?.PreRegImage?.asset?.url || "/fallback-bg.png";

  console.log("logoImage", logoImage);
  console.log("loginImage", PreRegImage);

  return <PreRegForm image={PreRegImage} logo={logoImage} />;
}

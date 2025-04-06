import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() { 
  (await cookies()).delete("session");
}

type SessionPayload = {
  userId: string;
  role: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

// New helper function to get the current user's role
export async function getUserRole() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    
    if (!session) return null;
    
    const payload = await decrypt(session) as SessionPayload | null;
    return payload?.role || null;
  }

  export async function getCurrentUser() {
    const sessionToken = (await cookies()).get("session")?.value;
    if (!sessionToken) return null;
  
    const payload = (await decrypt(sessionToken)) as {
      userId: string;
      role: string;
      expiresAt: string;
    } | null;
  
    if (!payload) return null;
    return payload;
  }
  
  export async function getCurrentUserId(): Promise<string | null> {
    const user = await getCurrentUser();
    return user?.userId ?? null;
  }
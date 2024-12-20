import { getSession, signIn, signOut } from "next-auth/react";

export const cognitoConfig = {
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER,
  authorization: {
    params: {
      scope: "openid email profile",
      response_type: "code",
    },
  },
  client: {
    token_endpoint_auth_method: "client_secret_basic",
  },
};

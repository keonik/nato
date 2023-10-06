import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
// import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import OktaProvider from 'next-auth/providers/okta'
// import { Client } from "postmark"

import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { Provider } from "next-auth/providers"


const getProviders = () => {
    const providers:Provider[] = [];

    if(
        process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET
    ){
        providers.push(GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }))}
      if(
        process.env.GITHUB_CLIENT_ID &&
        process.env.GITHUB_CLIENT_SECRET
      )
{    providers.push(GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }))}
    if(process.env.OKTA_CLIENT_ID && process.env.OKTA_CLIENT_SECRET && process.env.OKTA_ISSUER){
      providers.push(
        OktaProvider({
          clientId: process.env.OKTA_CLIENT_ID,
          clientSecret: process.env.OKTA_CLIENT_SECRET,
          issuer: process.env.OKTA_ISSUER,

        })
      )
    }
//    if(
//     process.env.SMTP_FROM &&
//     process.env.POSTMARK_API_TOKEN &&
//     process.env.POSTMARK_ACTIVATION_TEMPLATE &&
//     process.env.POSTMARK_SIGN_IN_TEMPLATE
//    ){ 
// // const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

//     providers.push(EmailProvider({
//       from: process.env.SMTP_FROM,
//       sendVerificationRequest: async ({ identifier, url, provider }) => {
//         const user = await db.user.findUnique({
//           where: {
//             email: identifier,
//           },
//           select: {
//             emailVerified: true,
//           },
//         })

//         const templateId = user?.emailVerified
//           ? process.env.POSTMARK_SIGN_IN_TEMPLATE
//           : process.env.POSTMARK_ACTIVATION_TEMPLATE
//         if (!templateId) {
//           throw new Error("Missing template id")
//         }

//         const result = await postmarkClient.sendEmailWithTemplate({
//           TemplateId: parseInt(templateId),
//           To: identifier,
//           From: provider.from as string,
//           TemplateModel: {
//             action_url: url,
//             product_name: siteConfig.name,
//           },
//           Headers: [
//             {
//               // Set this to prevent Gmail from threading emails.
//               // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
//               Name: "X-Entity-Ref-ID",
//               Value: new Date().getTime() + "",
//             },
//           ],
//         })

//         if (result.ErrorCode) {
//           throw new Error(result.Message)
//         }
//       },
//     }))}
    return providers;
}

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: getProviders(),
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}


import { QwikAuth$ } from '@auth/qwik'
import Discord from '@auth/qwik/providers/discord'

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(() => ({
  providers: [
    Discord({
      authorization: {
        url: `https://discord.com/oauth2/authorize?client_id=${import.meta.env.PUBLIC_DISCORD_ID}&response_type=code&redirect_uri=${import.meta.env.PUBLIC_DISCORD_REDIRECT_URI}&scope=identify+guilds`,
        params: { scope: 'identify guilds' }
      }
    })
  ],
  callbacks: {
    // Capture the access token in the JWT token
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token // Store the access token in the JWT token
      }
      return token
    },

    // Make the access token available in the session
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken // Store the access token in the session object
      }
    }
  }
}))

import Head from 'next/head'
import { Heading, Text, Code, Button } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'

const Home = () => {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={() => auth.signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => auth.signInWithGitHub()}>Sign in</Button>
        )}
      </main>
    </div>
  )
}

export default Home

import Head from 'next/head'
import { Flex, Button, Icon } from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'

const Home = () => {
  const auth = useAuth()

  return (
    <Flex
      as='main'
      direction='column'
      align='center'
      justify='center'
      h='100vh'
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Icon name='logo' size='64px' />
      {auth.user ? (
        <Button onClick={() => auth.signOut()}>sign out</Button>
      ) : (
        <Button size='sm' mt={4} onClick={() => auth.signInWithGitHub()}>
          sign in
        </Button>
      )}
    </Flex>
  )
}

export default Home

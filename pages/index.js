import { useAuth } from '../lib/auth'

const Home = () => {
  const auth = useAuth()

  return (
    <div>
      <main>
        <h1>Fast Feedback</h1>
        <button onClick={() => auth.signInWithGithub()}>Sign in</button>
        <button onClick={() => auth.signOut()}>Sign out</button>
        <div>{auth?.user?.email}</div>
      </main>
    </div>
  )
}

export default Home

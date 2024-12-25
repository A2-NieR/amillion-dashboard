import { component$ } from '@builder.io/qwik'
import SignIn from '~/components/sign-in'

export default component$(() => {
  return (
    <div>
      <h1>Login</h1>
      <SignIn />
    </div>
  )
})

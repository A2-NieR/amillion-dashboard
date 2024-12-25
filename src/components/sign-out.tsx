import { component$ } from '@builder.io/qwik'
import { Form } from '@builder.io/qwik-city'
import { useSignOut } from '~/routes/plugin@auth'

export default component$(() => {
  const signOutSig = useSignOut()

  return (
    <>
      <Form action={signOutSig}>
        <input type="hidden" name="redirectTo" value="/login" />
        <button>Sign Out</button>
      </Form>
    </>
  )
})

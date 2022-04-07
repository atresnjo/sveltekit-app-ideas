<script lang="ts">
  import trcp from '$lib/client/trpc';
  import * as yup from 'yup';
  import { validator } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import reporter from '@felte/reporter-tippy';
  import 'tippy.js/dist/tippy.css';
  import { Routes } from '$lib/routes';

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    username: yup.string().required()
  });

  const { form } = createForm({
    initialValues: {
      email: '',
      password: '',
      username: ''
    },
    extend: [validator({ schema }), reporter()],
    onSubmit: async (values) => {
      trcp.mutation('auth:signup', { ...values });
    }
  });
</script>

<div class="h-screen md:flex">
  <div
    class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-primary to-success justify-around items-center hidden"
  >
    <div>
      <h1 class="text-base-100 font-bold tracking-widest text-4xl">MyMusic 🎵</h1>
      <p class="text-base-100 mt-1">The only way to find your best tracks.</p>
    </div>
    <div
      class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"
    />
    <div
      class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"
    />
    <div
      class="absolute -top-40 -right-0 w-80 h-48 border-4 rounded-full border-opacity-30 border-t-8"
    />
    <div
      class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"
    />
  </div>
  <form
    use:form
    class="flex h-screen justify-center sm:w-1/2 text-center flex-col items-center bg-base-100"
  >
    <div class="max-w-lg space-y-4 w-full p-2 ">
      <div class="form-control w-full ">
        <label for="username" class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter your username..."
          class="input input-bordered rounded-md w-full max-w-md"
        />
        <div id="username-validation" data-felte-reporter-dom-for="username" aria-live="polite" />
      </div>
      <div class="form-control w-full ">
        <label for="password" class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email..."
          class="input input-bordered rounded-md w-full max-w-md"
        />
      </div>
      <div class="form-control w-full ">
        <label for="password" class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password..."
          class="input input-bordered rounded-md w-full max-w-md"
        />
      </div>

      <div class="form-control w-full ">
        <a href={Routes.login} class="text-left link-hover text-info">Already have an account?</a>

        <button
          type="submit"
          class="max-w-md mt-6 text-base-100 rounded-md block w-full btn btn-primary">Submit</button
        >
      </div>
    </div>
  </form>
</div>

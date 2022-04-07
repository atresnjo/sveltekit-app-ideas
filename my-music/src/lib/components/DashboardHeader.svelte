<script>
  import { Routes } from '$lib/routes';
</script>

<header class="z-10 py-4 bg-base-100">
  <div
    class="max-w-screen-2xl flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
  >
    <!-- Mobile hamburger -->
    <button
      class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
      aria-label="Menu"
    >
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div class="space-x-4 flex flex-1 lg:mr-32">
      <div class="relative w-full max-w-xl mr-6 0">
        <div class="card">
          <div class="form-control">
            <input
              type="text"
              placeholder="Search for songs..."
              class="rounded-2xl input bg-base-100 input-bordered "
            />
          </div>
        </div>
      </div>
    </div>

    <ul class="flex items-center flex-shrink-0 space-x-6 ">
      <li class="relative">
        <div class="dropdown dropdown-end ">
          <button
            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
            aria-label="Account"
            aria-haspopup="true"
          >
            <img
              tabindex="0"
              class="object-cover w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
              alt=""
              aria-hidden="true"
            />
            <ul
              tabindex="0"
              class="p-4 mt-3 shadow menu dropdown-content rounded-xl bg-neutral w-52"
            >
              <li>
                <a class="text-neutral-content" href="/profile">Profile</a>
              </li>
              <li>
                <a
                  class="text-neutral-content"
                  href={Routes.login}
                  on:click={() => localStorage.removeItem('auth_token')}>Sign out</a
                >
              </li>
            </ul>
          </button>
        </div>
      </li>
    </ul>
  </div>
</header>

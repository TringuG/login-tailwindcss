(async () => {
  const AppwriteAdapter = () => {
    return {
      sdk: null,

      async setUp(config) {
        this.sdk = new Appwrite(config);
        this.sdk.setEndpoint(config.endpoint).setProject(config.projectId);
      },

      // TODO: Start using
      getProviders() {
        return ["google", "github"];
      },

      async getProfile() {
        return await sdk.account.get();
      },

      async signIn(email, password) {
        await sdk.account.createSession(email, password);
      },

      async signInOauth(provider) {
        sdk.account.createOAuth2Session(provider);
      },

      async signInMagicLink(email) {
        await sdk.account.createMagicURLSession("unique()", email);
      },

      async signUp(name, email, password) {
        await sdk.account.create("unique()", email, password, name);
      },
    };
  };

  document.body.insertAdjacentHTML(
    "beforeend",
    `<style> @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');</style>`
  );

  tailwind.config = tailwind.config || {};
  tailwind.config = {
    ...tailwind.config,
    theme: {
      extend: {
        colors: {
          "auth-gray": {
            50: "#f6f9fe",
            100: "#eef4fc",
            200: "#dce5f6",
            300: "#c2d0ea",
            400: "#869bc6",
            500: "#556b9a",
            600: "#3a4d76",
            700: "#263962",
            800: "#132146",
            900: "#040d30",
          },
        },
      },
    },
  };

  const signIn = `
<div>
  <form class="mt-6">
    <div>
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Email</label>
      <input type="email" placeholder="admin@appwrite.io" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>
    <div class="mt-4">
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Password</label>
      <input type="password" placeholder="Password" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>
    <div class="mt-6 flex justify-center">
      <button type="button" x-on:click="$store.authModal.goTo('profile')" class="ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
        Sign In
      </button>
    </div>
  </form>

  <div class="flex items-center justify-between mt-6">
    <span class="w-2/5 border-b"></span>
    <p class="text-sm text-center text-black uppercase">or</p>
    <span class="w-2/5 border-b"></span>
  </div>

  <div class="flex items-center mt-6 mb-4">
    <button x-on:click="$store.authModal.goTo('magicLink')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-md ring-auth-gray-100 hover:bg-auth-gray-200 bg-auth-gray-100 text-auth-gray-900 focus:ring-4 hover:border-auth-gray-100 focus:bg-auth-gray-100 focus:border-auth-gray-100 focus:outline-none">
      <svg class="w-4 h-4 font-extrabold mx-2 fill-current" viewBox="0 0 24 24">
        <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
      </svg>
      <span class="mx-2 sm:inline">Sign in with Magic Link</span>
    </button>
  </div>

  <div class="flex justify-center items-center space-x-4">
    <div class="flex items-center w-full">
      <button x-on:click="$store.authModal.goTo('profile')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
      <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
      <span class="mx-2 sm:inline">Sign in with Google</span>
      </button>
    </div>
    <div class="flex items-center w-full">
      <button x-on:click="$store.authModal.goTo('profile')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white transition-colors duration-200 transform bg-neutral-800 border-2 border-neutral-800 rounded-md hover:bg-black hover:border-black">
        <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span class="mx-2 sm:inline">Sign in with Github</span>
      </button>
    </div>
  </div>

  <div class="mt-8 text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
    <p class="">Don't have an account?</p>
    <button type="button" x-on:click="$store.authModal.goTo('signUp')" class="font-medium text-brand-600 underline hover:text-brand-900">
      Create One
    </button>
  </div>
</div>
  `;

  const signUp = `
<div>
  <form class="mt-6">
    <div>
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Name</label>
      <input type="text" placeholder="John Walker" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-4">
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Email</label>
      <input type="email" placeholder="admin@appwrite.io" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-4">
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Password</label>
      <input type="password" placeholder="Password" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-6 flex justify-center">
      <button type="button" x-on:click="$store.authModal.goTo('profile')" class="ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
        Sign Up
      </button>
    </div>
  </form>

  <div class="mt-8 text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
    <p class="">Already have an account?</p>
    <button type="button" x-on:click="$store.authModal.goTo('signIn')" class="font-medium text-brand-600 underline hover:text-brand-900">
      Sign In
    </button>
  </div>
</div>
  `;

  const magicLink = `
<div>
  <form class="mt-6">
    <div>
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Email</label>
      <input type="email" placeholder="admin@appwrite.io" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-6 flex justify-center">
      <button type="button" x-on:click="$store.authModal.goTo('magicLinkFinish')" class="ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
        Send Magic Link
      </button>
    </div>
  </form>

  <div class="mt-8 text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
    <p class="">Already have an account?</p>
    <button type="button" x-on:click="$store.authModal.goTo('signIn')" class="font-medium text-brand-600 underline hover:text-brand-900">
      Sign In
    </button>
  </div>
</div>
  `;

  const magicLinkFinish = `
<div>
  <p class="text-sm text-gray-500 mb-2">We emailed a magic link to </p>
  <p class="text-lg font-bold text-black mb-2">admin@appwrite.io</p>
  <p class="text-sm text-gray-500 mb-2">Click the link to log in or sign up.</p>
</div>
  `;

  const profile = `
<div>
  <p class="text-sm text-left text-gray-500 mb-2">Logged in as</p>
  <p class="text-lg text-left text-black mb-2">admin@appwrite.io</p>
  <div class="mt-6 flex justify-center">
    <button type="button" x-on:click="$store.authModal.goTo('signIn')" class="ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
      Log Out
    </button>
  </div>
</div>
`;

  Alpine.store("authModal", {
    opened: false,
    currentPage: null,

    // TODO: profile
    pagesConfig: [
      {
        id: "signIn",
        title: "Sign In",
        template: signIn,
      },
      {
        id: "signUp",
        title: "Sign Up",
        template: signUp,
      },
      {
        id: "magicLink",
        title: "Sign In with Magic Link",
        template: magicLink,
      },
      {
        id: "magicLinkFinish",
        title: "Check your email inbox",
        template: magicLinkFinish,
      },
      {
        id: "profile",
        title: "My Account",
        template: profile,
      },
    ],

    async init() {
      this.goTo("signIn");

      await this.prepareAdapter();
    },

    async prepareAdapter() {
      const { config, adapter } = window.authModal;

      switch (adapter) {
        case "appwrite":
          this.adapter = AppwriteAdapter();
          break;
        default:
          throw new Errror("Adapter not supported by Auth Modal.");
      }

      await this.adapter.setUp(config);
    },

    open(page) {
      this.opened = true;

      if (page) {
        this.goTo(page);
      }
    },

    close(reset = true) {
      this.opened = false;

      if (reset) {
        this.goTo("signIn");
      }
    },

    goTo(page) {
      this.currentPage = this.pagesConfig.find((p) => p.id === page);
    },
  });

  const authModal = `
<template x-if="$store.authModal.opened">
  <div class="fixed inset-0" style="font-family: 'Montserrat', sans-serif;">
    <div class="w-full h-full relative">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative w-full h-full pt-10">
        <div class="mx-auto w-full max-w-2xl rounded-xl bg-white p-6">
          <div class="flex justify-between items-center">
            <h1 class="text-auth-gray-900 mb-4 text-2xl font-bold" x-text="$store.authModal.currentPage.title"></h1>
            <button type="button" x-on:click="$store.authModal.close()" class="p-3 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
          </div>
          <div class="mt-6">
            <div x-html="$store.authModal.currentPage.template"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  `;

  document.body.insertAdjacentHTML("beforeend", authModal);
})();

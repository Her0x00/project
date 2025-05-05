"use client"
import { authClient } from "@/lib/auth-client"

export default function LoginForm() {
  const {data: session} = authClient.useSession()
  console.log('user', session?.user)
  const handleSignIn = async ()=> {
    console.log('signing in')
    const data = await authClient.signIn.social({provider: 'github', callbackURL: "/todo-app"})
    console.log(data)
  }
    return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="w-[525px] p-9 bg-white shadow-lg rounded-lg transform scale-125">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Login</h2>

        <div className="flex flex-col">
          <label className="text-xl text-black">Email address</label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 border rounded mb-2 text-xl text-black"
          />
        </div>

        <div className="flex flex-col mt-5">
          <label className="text-xl text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-2 text-xl text-black"
          />
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 text-xl rounded hover:bg-blue-700 select-none">
          Log in
        </button>

        <button onClick={handleSignIn}
          type="button"
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white text-xl rounded hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5 select-none"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0C5.37 0 0 5.373 0 12a12.001 12.001 0 008.205 11.386c.6.111.82-.26.82-.577v-2.234c-3.338.727-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.808 1.304 3.492.997.107-.776.418-1.305.76-1.605-2.666-.306-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.649.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.621-5.479 5.921.43.371.814 1.102.814 2.222v3.293c0 .32.218.694.825.576A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}

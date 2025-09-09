import React, { useState } from 'react';

interface User {
  email_address: string;
  role: string;
}

interface SignInFormProps {
  onSignIn: (user: User) => void;
}

interface SignInResponse {
  user?: User;
  error?: string;
}

export function SignInForm({ onSignIn }: SignInFormProps) {
  const [error, setError] = useState<string | null>(null);
  const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')!.content;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const submit = async () => {
        const formData = new FormData(event.currentTarget);
        const response = await fetch('/session', {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRF-Token': csrfToken,
            'Accept': 'application/json',
          },
        });

        const data = await response.json() as SignInResponse;

        if (response.ok && data.user) {
          onSignIn(data.user);
        } else {
          setError(data.error ?? 'An unexpected error occurred.');
        }
    };
    void submit();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            <div>
              <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email_address" name="email_address" type="email" autoComplete="email" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

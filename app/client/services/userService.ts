import type { User } from '../components/types';

export const getCurrentUser = async (): Promise<User | null> => {
  const response = await fetch('/current_user');
  if (!response.ok) {
    return null;
  }
  const data = await response.json() as { user: User | null };
  return data.user;
};

export const signOut = async (): Promise<void> => {
  const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
  const response = await fetch('/api/v1/session', {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    // Redirect to home page or refresh to reflect sign-out state
    window.location.href = '/';
  } else {
    // Handle error, e.g., show a notification
    console.error('Sign out failed');
  }
};
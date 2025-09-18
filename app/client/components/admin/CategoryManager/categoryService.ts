export interface Category {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch('/api/v1/admin/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json() as Category[];
};

export const createCategory = async (name: string): Promise<Category> => {
  const response = await fetch('/api/v1/admin/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ''
    },
    body: JSON.stringify({ category: { name } }),
  });

  if (!response.ok) {
    const errorData = await response.json() as { errors: string[] };
    throw new Error(errorData.errors.join(', '));
  }

  return await response.json() as Category;
};

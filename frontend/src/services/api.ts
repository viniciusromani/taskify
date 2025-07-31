const base = (import.meta.env.VITE_API_URL as string) ?? undefined;
type QueryParams = Record<string, string | number | boolean | undefined>;

function get<T>(path: string, queryParams?: QueryParams): Promise<T> {
  const url = new URL(path, base);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const options: RequestInit = {
    method: "GET",
    credentials: "include",
  };
  return fetch(url, options).then(handleResponse<T>);
}
function post<T>(path: string, body: any): Promise<T> {
  const url = new URL(path, base);
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, options).then(handleResponse<T>);
}
function patch<T>(path: string, body: any): Promise<T> {
  const url = new URL(path, base);
  const options: RequestInit = {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, options).then(handleResponse<T>);
}
function _delete<T>(path: string): Promise<T> {
  const url = new URL(path, base);
  const options: RequestInit = {
    method: "DELETE",
    credentials: "include",
  };
  return fetch(url, options).then(handleResponse<T>);
}

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const parsed: unknown = text ? JSON.parse(text) : {};
  const data = parsed as T;

  if (!response.ok) {
    const message =
      typeof parsed === "object" && parsed !== null && "message" in parsed
        ? String((parsed as { message?: string }).message)
        : response.statusText;

    throw new Error(message);
  }

  return data;
}

export const api = { get, post, patch, _delete };

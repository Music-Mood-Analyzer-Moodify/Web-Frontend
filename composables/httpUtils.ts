export function setHeaders(token: string, origin: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

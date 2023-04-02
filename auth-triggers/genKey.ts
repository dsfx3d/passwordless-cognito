export function genKey(length: number = 32): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  return new Array(length).map(() =>
    charset.charAt(Math.floor(Math.random() * charset.length))
  ).join('')
}

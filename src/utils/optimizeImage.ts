// src/utils/optimizeImage.ts
export function getOptimizedImage(url: string, params = 'w_300,f_auto,q_auto') {
  if (!url.includes('cloudinary.com')) return url; // Если ссылка не из облака, ничего не делаем
  return url.replace('/upload/', `/upload/${params}/`);
}
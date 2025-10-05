export function getStrapiURL(path = "") {
  return (
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  ) + path;
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  try {
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const queryString = new URLSearchParams(urlParamsObject).toString();
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from Strapi: ${error}`);
    throw new Error(`Could not fetch ${path}`);
  }
}

export function getStrapiMedia(media) {
  if (!media?.data?.attributes?.url) {
    return null; // ou uma imagem placeholder
  }
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
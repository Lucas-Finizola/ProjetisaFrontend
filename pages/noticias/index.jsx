import qs from 'qs';

export function getStrapiURL(path = "") {
  return (process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337") + path;
}

export function getStrapiMedia(media) {
  if (!media?.data?.attributes?.url) {
    return null;
  }
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Se o token de API não estiver definido, lança um erro claro.
  if (!process.env.STRAPI_API_TOKEN) {
    throw new Error("STRAPI_API_TOKEN não encontrado no arquivo .env.local");
  }

  try {
    const mergedOptions = {
      ...options, // Permite sobrescrever headers se necessário
      headers: {
        "Content-Type": "application/json",
        // AQUI ESTÁ A MUDANÇA: Adicionando o header de autorização
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    };

    const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    
    // Se a API retornar um erro estruturado do Strapi
    if (data.error) {
      console.error("Erro retornado pela API Strapi:", JSON.stringify(data.error, null, 2));
      throw new Error(`Erro do Strapi: ${data.error.message} (Status: ${data.error.status})`);
    }

    return data;
  } catch (error) {
    console.error(`ERRO no fetchAPI para o caminho '${path}':`, error.message);
    throw new Error(`Falha ao buscar dados da API para o caminho: ${path}.`);
  }
}
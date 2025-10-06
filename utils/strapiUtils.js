import qs from 'qs';

// Função para obter a URL base da API
export function getStrapiURL(path = "") {
  return (process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337") + path;
}

// Função para obter a URL de uma mídia de forma segura
export function getStrapiMedia(media) {
  if (!media?.data?.attributes?.url) {
    return null;
  }
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

// Função de fetch FINAL e segura
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  try {
    const mergedOptions = {
      headers: { "Content-Type": "application/json" },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Erro de resposta da API para ${requestUrl}: ${response.status} ${response.statusText}`);
      return { data: null }; // Retorna um objeto seguro em caso de erro de rede/servidor
    }

    const data = await response.json();

    if (data.error) {
      console.error("Erro retornado pela API Strapi:", JSON.stringify(data.error, null, 2));
      throw new Error(`Erro do Strapi: ${data.error.message}`);
    }

    return data;
  } catch (error) {
    console.error(`ERRO CRÍTICO no fetchAPI para o caminho '${path}':`, error.message);
    // Em caso de qualquer erro, retorna um objeto seguro para evitar 'undefined'
    return { data: null };
  }
}
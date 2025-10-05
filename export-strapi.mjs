import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import qs from 'qs';
import { fileURLToPath } from 'url';

// --- Configuração ---
const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, 'src/content');

// Coleções e campos de mídia corretos, baseados na resposta da API do Strapi
const COLLECTIONS = {
    publicacoes: {
        mediaFields: ['imagem_destacada', 'galeria']
    },
    projetos: {
        mediaFields: ['imagem_destaque', 'galeria'] // Corrigido de imagem_destacada
    },
    servicos: {
        mediaFields: ['imagem'] // Corrigido de imagem_destacada
    },
    faqs: { 
        mediaFields: [] 
    },
    'video-depoimentos': { 
        mediaFields: ['capa', 'video']
    },
    equipes: {
        mediaFields: ['foto']
    },
    categorias: {
        mediaFields: []
    }
};

// --- Funções Auxiliares ---

function toRelativePath(url) {
    if (typeof url !== 'string') return null;
    try {
        const urlObject = new URL(url);
        return urlObject.pathname;
    } catch (error) {
        if (url.startsWith('/')) return url;
        console.warn(`URL inválida ou já relativa encontrada: ${url}`);
        return null;
    }
}

function processMediaFields(entity, mediaFields) {
    if (!entity || !mediaFields) return;
    for (const field of mediaFields) {
        if (entity[field]) {
            if (Array.isArray(entity[field].data)) {
                const validItems = entity[field].data.filter(item => item && item.attributes && item.attributes.url);
                entity[field] = validItems.map(item => toRelativePath(item.attributes.url));
            } else if (entity[field].data && entity[field].data.attributes && entity[field].data.attributes.url) {
                entity[field] = toRelativePath(entity[field].data.attributes.url);
            } else if(typeof entity[field] === 'string' || entity[field] === null) {
                // O dado já está no formato correto
            } else {
                 entity[field] = null;
            }
        }
    }
}

// --- Lógica Principal ---

async function exportStrapiData() {
    console.log(`Iniciando exportação de dados de: ${STRAPI_URL}`);
    console.log(`Diretório de saída: ${OUTPUT_DIR}`);
    await fs.ensureDir(OUTPUT_DIR);

    for (const [collectionName, config] of Object.entries(COLLECTIONS)) {
        const collectionPath = path.join(OUTPUT_DIR, collectionName);
        await fs.ensureDir(collectionPath);

        try {
            console.log(`Buscando e processando coleção: ${collectionName}...`);
            const query = qs.stringify({ populate: '*', pagination: { pageSize: 100 } }, { encodeValuesOnly: true });
            const response = await axios.get(`${STRAPI_URL}/api/${collectionName}?${query}`);
            
            if (!response.data || !response.data.data) {
                console.warn(`Nenhum dado encontrado para a coleção ${collectionName}.`);
                continue;
            }

            let entries = response.data.data;

            for (const entry of entries) {
                const flatEntry = { id: entry.id, ...entry.attributes };
                if (!flatEntry.documentId) {
                    flatEntry.documentId = `${collectionName}-${entry.id}`;
                }
                processMediaFields(flatEntry, config.mediaFields);
                const filePath = path.join(collectionPath, `${entry.id}.json`);
                await fs.writeJson(filePath, flatEntry, { spaces: 2 });
            }
            console.log(`✅ Coleção ${collectionName} exportada com sucesso para ${collectionPath}`);
        } catch (error) {
            console.error(`❌ Erro ao exportar a coleção ${collectionName}:`);
            if (error.response) {
                console.error(`  - Status: ${error.response.status} ${error.response.statusText}`);
                 console.error(`  - URL: ${error.config.url}`);
            } else {
                console.error(`  - Mensagem: ${error.message}`);
            }
        }
    }
    console.log('\nExportação concluída!');
}

exportStrapiData();

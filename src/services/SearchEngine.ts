import axios from 'axios';
import * as cheerio from 'cheerio';
import { Agent as HttpsAgent } from 'https';
import iconv from 'iconv-lite';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function get_useragent(): string {
  const lynx_version = `Lynx/${getRandomInt(2, 3)}.${getRandomInt(8, 9)}.${getRandomInt(0, 2)}`;
  const libwww_version = `libwww-FM/${getRandomInt(2, 3)}.${getRandomInt(13, 15)}`;
  const ssl_mm_version = `SSL-MM/${getRandomInt(1, 2)}.${getRandomInt(3, 5)}`;
  const openssl_version = `OpenSSL/${getRandomInt(1, 3)}.${getRandomInt(0, 4)}.${getRandomInt(0, 9)}`;
  return `${lynx_version} ${libwww_version} ${ssl_mm_version} ${openssl_version}`;
}

interface SearchResultProps {
    url: string;
    title: string;
    description: string;
}

class SearchResult {
    url: string;
    title: string;
    description: string;

    constructor({ url, title, description }: SearchResultProps) {
        this.url = url;
        this.title = title;
        this.description = description;
    }

    toJSON(): SearchResultProps {
        return {
            url: this.url,
            title: this.title,
            description: this.description,
        };
    }
}

interface ReqParams {
    urlBase?: string | undefined;
    term?: string;
    results?: number;
    lang?: string;
    start?: number;
    proxies?: any;
    timeout?: number;
    safe?: string;
    ssl_verify?: boolean;
    region?: string | null;
}

async function _req({ urlBase, term, results, lang, start, proxies, timeout = 5, safe, ssl_verify, region }: ReqParams): Promise<string> {
  const params: Record<string, any> = {};

    if (term !== undefined) params.q = term;
    if (results !== undefined) params.num = results + 2;
    if (lang !== undefined) params.hl = lang;
    if (start !== undefined) params.start = start;
    if (safe !== undefined) params.safe = safe;
    if (region !== undefined) params.gl = region;

    const headers = {
        'User-Agent': get_useragent(),
        'Accept': '*/*',
        'Cookie': 'CONSENT=PENDING+987; SOCS=CAESHAgBEhIaAB',
    };

    try {
        const resp = await axios.get(urlBase || 'https://www.google.com/search', 
        {
            params,
            headers,
            proxy: proxies,
            timeout: timeout * 1000,
            httpsAgent: ssl_verify ? undefined : new HttpsAgent({ rejectUnauthorized: false }),
            responseType: 'arraybuffer'
        });

        const contentType = resp.headers['content-type'];
        let html = '';

        if (contentType && contentType.includes('charset=ISO-8859-1')) {
            html = iconv.decode(Buffer.from(resp.data), 'ISO-8859-1');
        } else {
            html = resp.data.toString();
        }

        return html;
    } catch (error) {
        const err = error as Error;
        console.error('Error in _req:', err.message);
        return '';
    }
}

interface SearchOptions {
    term: string;
    num_results?: number;
    lang?: string;
    proxy?: string | null;
    advanced?: boolean;
    sleep_interval?: number;
    timeout?: number;
    safe?: string;
    ssl_verify?: boolean;
    region?: string | null;
    start_num?: number;
    unique?: boolean;
}

async function search({ term, num_results = 10, lang = 'en', proxy = null, advanced = false, sleep_interval = 0, timeout = 5, safe = 'active', ssl_verify = true, region = null, start_num = 0, unique = false }: SearchOptions): Promise<Array<SearchResultProps>> {
    let start = start_num;
    let fetched_results = 0;
    const fetched_links = new Set<string>();
    const results: Array<SearchResultProps> = [];

    while (fetched_results < num_results) {
        try {
            const html = await _req({ term, results: num_results - start, lang, start, proxies: proxy, timeout, safe, ssl_verify, region });
            

            if (!html) break;
            const $ = cheerio.load(html);
            const result_blocks = $('div.ezO2md');

            let new_results = 0;

            // @ts-ignore
            result_blocks.each((_, result) => {
                const link_tag = $(result).find('a[href]');
                const title_tag = link_tag.find('span.CVA68e');
                const description_tag = $(result).find('span.FrIlee');                
                if (link_tag.length && title_tag.length && description_tag.length) {
                    const link = decodeURIComponent(link_tag.attr('href')!.split('&')[0].replace('/url?q=', ''));
                    if (fetched_links.has(link) && unique) return true;

                    fetched_links.add(link);
                    const title = title_tag.text();
                    const description = description_tag.text();
                    fetched_results++;
                    new_results++;

                    if (advanced) {
                        results.push(new SearchResult({ url: link, title, description }).toJSON());
                    } else {
                        results.push(new SearchResult({ url: link, title:'', description: ''}).toJSON())
                    }

                    if (fetched_results >= num_results) return false;
                }
            });

            if (new_results === 0) {
                console.log(`Only ${fetched_results} results found for query requiring ${num_results} results. Moving on.`);
                break;
            }

            start += 10;
            if (sleep_interval > 0) {
                await new Promise(resolve => setTimeout(resolve, sleep_interval * 1000));
            }
        } catch (error) {
            const err = error as Error;
            console.error('Error in search:', err.message);
            break;
        }
    }

    return results;
}

const MAX_LENGTH = 1000;

function extraerDatos(html: string) {
  const $ = cheerio.load(html);
  const title = $("title").text();
  const description = $("meta[name='description']").attr("content");

  $("script, source, style, img, svg, form, iframe").remove();
	$("*").removeClass();
  const text = $("body").text().replace(/\s+/g, " ")
  return {
    title: title.substring(0, MAX_LENGTH),
    description: description?.substring(0, MAX_LENGTH),
    text: text.substring(0, MAX_LENGTH),
  }
}

export interface SearchEngineResponse {
    url: string;
    title: string;
    description: string;
    text: string;
}

export async function* SearchEngineStream({ query, pages }: { query: string; pages: number }): AsyncGenerator<SearchEngineResponse> {
    try {
      const results = await search({
        term: query,
        num_results: pages,
        advanced: true,
        lang: "pt-BR",
        region: "BR",
      });

      yield {
        url: "https://www.google.com/search?q=" + encodeURIComponent(query),
        title: "Resultados da pesquisa",
        description: "Resultados da pesquisa",
        text: results.map((result) => result.title).join("\n"),
      }
  
      const validResultUrls = results.filter((result) => "url" in result);
  
      for (const info of validResultUrls) {
        try {
          const html = await _req({ urlBase: info.url });
          const { title, description, text } = extraerDatos(html);
  
          yield {
            url: info.url,
            title,
            description: description || info.description,
            text,
          };
        } catch (err) {
          console.error(`Erro ao buscar ${info.url}:`, err);
        }
      }
    } catch (error) {
      console.error("Erro em SearchEngineStream:", error);
      yield {
        url: "",
        title: "Erro",
        description: "Sem resultados",
        text: "Sem resultados",
      };
    }
}
  

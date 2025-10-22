import { PageEnum, PAGE_PATTERNS } from '../model/page-enum';

export function mapUrlToPage(url: string | null): PageEnum {
    if (!url) {
        return PageEnum.UNKNOWN;
    }

    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;

        for (const page of Object.values(PageEnum)) {
            if (PAGE_PATTERNS[page].test(pathname)) {
                return page;
            }
        }

        return PageEnum.UNKNOWN;
    } catch {
        // Если url — это относительный путь
        const cleanPath = url.replace(/^https?:\/\/[^/]+/, '');
        for (const page of Object.values(PageEnum)) {
            if (PAGE_PATTERNS[page].test(cleanPath)) {
                return page;
            }
        }
        return PageEnum.UNKNOWN;
    }
}

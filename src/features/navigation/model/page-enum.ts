export enum PageEnum {
    HOME = 'home',
    CLUB_LIST = 'club_list',
    CLUB_CREATE = 'club_create',
    CLUB_DETAIL = 'club_detail',
    UNKNOWN = 'unknown',
}

type PagePatternsType = {
  [K in PageEnum]: RegExp;
};

export const PAGE_PATTERNS: PagePatternsType = {
  [PageEnum.HOME]: /^\/$/,
  [PageEnum.CLUB_LIST]: /^\/clubs$/,
  [PageEnum.CLUB_CREATE]: /^\/clubs\/create$/,
  [PageEnum.CLUB_DETAIL]: /^\/clubs\/[^/]+$/,
  [PageEnum.UNKNOWN]: /^$/,
};

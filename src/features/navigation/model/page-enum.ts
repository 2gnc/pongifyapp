export enum PageEnum {
    HOME = 'home',
    CLUB_LIST = 'club_list',
    CLUB_CREATE = 'club_create',
    CLUB_DETAIL = 'club_detail',
    CLUB_MEMBERS = 'club_members',
    SUPERADMIN = 'superadmin',
    UNKNOWN = 'unknown',
}

type PagePatternsType = {
  [K in PageEnum]: RegExp;
};

export const PAGE_PATTERNS: PagePatternsType = {
  [PageEnum.HOME]: /^\/$/,
  [PageEnum.CLUB_LIST]: /^\/clubs$/,
  [PageEnum.SUPERADMIN]: /^\/superadmin$/,
  [PageEnum.CLUB_CREATE]: /^\/clubs\/create$/,
  [PageEnum.CLUB_DETAIL]: /^\/clubs\/[^/]+$/,
  [PageEnum.CLUB_MEMBERS]: /^\/clubs\/[^/]+\/members$/,
  [PageEnum.UNKNOWN]: /^$/,
};

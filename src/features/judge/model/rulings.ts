export enum JudgeRuling {
    CAN_CREATE_CLUB = 'can_create_club',
    CAN_CREATE_EVENT = 'can_create_event',
    CAN_SEE_FINANCIAL_INFO = 'can_see_financial_info',
    CAN_MANAGE_MEMBERS = 'can_manage_invites',
}

export type AskCanCreateClub = {
    type: JudgeRuling.CAN_CREATE_CLUB;
};

export type AskCanAddEvent = {
    type: JudgeRuling.CAN_CREATE_EVENT;
    clubId: string;
};

export type AskCanSeeFinancialInfo = {
    type: JudgeRuling.CAN_SEE_FINANCIAL_INFO;
    clubId: string;
};

export type AskCanManageMembers = {
    type: JudgeRuling.CAN_MANAGE_MEMBERS;
    clubId: string;
};

export type JudgeRulingRequest =
    | AskCanCreateClub
    | AskCanAddEvent
    | AskCanSeeFinancialInfo
    | AskCanManageMembers;

import { ClubMemberFrontT, ClubMemberBannedFrontT } from "./schema";

export type ClubMembersT = {
    admins: ClubMemberFrontT[];
    members: ClubMemberFrontT[];
    banned: ClubMemberBannedFrontT[];
} 

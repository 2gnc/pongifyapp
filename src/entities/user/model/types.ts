export type UserFront = {
  id: string;
  telegramId: string;
  userName: string | null;
  firstName: string | null;
  canCreateClub: boolean;
  ownedClub: {
    name: string;
    id: string;
    description: string;
    createdAt: Date;
    isOpen: boolean;
    ownerId: string;
  } | null;
};

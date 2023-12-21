export interface IProfileUser {
  uid: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  phone?: string | null;
  address?: string | null;
  photoURL?: string | null;
  influencers_in?: string[] | null;
  influencers_yt?: string[] | null;
}

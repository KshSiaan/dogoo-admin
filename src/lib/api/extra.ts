import { howl } from "../utils";

export const getViewGroupApi = async ({
  token,
  id,
}: {
  token?: string;
  id: string | number;
}):Promise<{
  status: boolean
  message: string
  data: Array<{
    id: number
    user_id: number
    group_name: string
    challenge_type: string
    duration: string
    start_date: string
    end_date: string
    status: string
    created_at: string
    updated_at: string
    members_count: number
    max_count: number
    group_daily_progress: number
    my_daily_progress: number
    member_lists: Array<{
      id: number
      challenge_group_id: number
      user_id: number
      status: string
      joined_at: string
      created_at: string
      updated_at: string
      user: {
        id: number
        full_name: string
        avatar_url: string
      }
    }>
  }>
}
> => {
  return howl(`/view-group-web/${id}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};
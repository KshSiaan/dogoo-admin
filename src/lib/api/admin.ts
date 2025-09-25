

// >>>>>>>>>>>>> USER <<<<<<<<<<<<<<<

import { howl, idk } from "../utils";

export const getUsersApi = async ({
  search,
  page,
  token,
}: { search?: string; page?: number; token?: string }) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());

  const query = params.toString() ? `?${params.toString()}` : "";

  return howl(`/admin/get-users${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};


export const viewUserApi = async ({
  user_id,
  token,
}: { user_id: string | number; token?: string }) => {
  const query = `?user_id=${encodeURIComponent(user_id)}`;
  return howl(`/admin/view-user${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getBasicInfoApi = async ({
  user_id,
  token,
}: { user_id: string | number; token?: string }) => {
  const query = `?user_id=${encodeURIComponent(user_id)}`;
  return howl(`/admin/basic-info${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getTransactionsApi = async ({
  user_id,
  per_page,
  token,
}: { user_id: string | number; per_page?: number; token?: string }) => {
  return howl(`/admin/get-transations?user_id=${user_id}&per_page=${per_page}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};
export const blockUnblockUserApi = async ({
  token,
  id,
}: {
  id:string;
  token?: string;
}) => {
  return howl(`/admin/block-unblock-user?user_id=${id}`, {
    method: "PATCH",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

// >>>>>>>>>>>>>>>>> CHALLENGE MANAGEMENT <<<<<<<<<<<<<<<<<<<<

export const getActiveChallengesApi = async ({ token }: { token?: string }) => {
  return howl("/admin/get-active-challenges", {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};
export const getCompletedChallengesApi = async ({ token,page }: { token?: string,page:idk }) => {
  return howl(`/admin/get-completed-challenges?page=${page}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const viewActiveChallengeApi = async ({
  challenge_id,
  token,
}: { challenge_id: string | number; token?: string }) => {
  return howl(`/admin/view-active-challenge/${challenge_id}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const viewCompletedChallengeApi = async ({
  challenge_id,
  token,
}: { challenge_id: string | number; token?: string }) => {
  return howl(`/admin/view-completed-challenge/${challenge_id}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getTypesApi = async ({
  search,
  token,
}: { search?: string; token?: string }) => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return howl(`/admin/get-types${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const viewTypeApi = async ({
  type_id,
  token,
}: { type_id: string | number; token?: string }) => {
  return howl(`/admin/view-type/${type_id}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const addTypeApi = async ({
  body,
  token,
}: {
  body: { challenge_type: string; note?: string };
  token?: string;
}) => {
  return howl("/admin/add-type", {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
  });
};

export const editTypeApi = async ({
  type_id,
  body,
  token,
}: {
  type_id: string | number;
  body: { challenge_type: string; note?: string; _method?: "PATCH" };
  token?: string;
}) => {
  return howl(`/admin/edit-type/${type_id}`, {
    method: "POST", // backend expects POST + _method override
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: {
      ...body,
      _method: "PATCH", // ensure PATCH override is always set
    },
  });
};

export const deleteTypeApi = async ({
  type_id,
  token,
}: { type_id: string | number; token?: string }) => {
  return howl(`/admin/delete-type/${type_id}`, {
    method: "DELETE",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};


// >>>>>>>>>>>>>>>>> REWARDS <<<<<<<<<<<<<<<<<<<<

export const getRewardsApi = async ({ token }: { token?: string }) => {
  return howl("/admin/get-rewards", {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const viewRewardApi = async ({
  reward_id,
  token,
}: { reward_id: string | number; token?: string }) => {
  return howl(`/admin/view-reward/${reward_id}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const approveRewardApi = async ({
  reward_id,
  token,
}: { reward_id: string | number; token?: string }) => {
  return howl(`/admin/approved-reward?reward_id=${encodeURIComponent(reward_id)}`, {
    method: "PATCH",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const cancelRewardApi = async ({
  reward_id,
  token,
}: { reward_id: string | number; token?: string }) => {
  return howl(`/admin/canceled-reward?reward_id=${encodeURIComponent(reward_id)}`, {
    method: "PATCH",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};


// >>>>>>>>>>>>>>>>> PARTNERS <<<<<<<<<<<<<<<<<<<<

export const getPartnersApi = async ({
  search,
  per_page,
  page,
  token,
}: { search?: string; per_page?: number; page?: number; token?: string }) => {
  const query = `?${[
    search ? `search=${encodeURIComponent(search)}` : null,
    per_page ? `per_page=${per_page}` : null,
    page ? `page=${page}` : null,
  ]
    .filter(Boolean)
    .join("&")}`;
  return howl(`/admin/get-partners${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const viewPartnerUserApi = async ({
  user_id,
  token,
}: { user_id: string | number; token?: string }) => {
  return howl(`/admin/view-user?user_id=${encodeURIComponent(user_id)}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const blockUnblockPartnerApi = async ({
  user_id,
  token,
}: { user_id: string | number; token?: string }) => {
  return howl(`/admin/block-unblock-user?user_id=${encodeURIComponent(user_id)}`, {
    method: "PATCH",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};


// >>>>>>>>>>>>>>>>> SUBSCRIPTIONS <<<<<<<<<<<<<<<<<<<<

export const getSubscriptionsApi = async ({
  search,
  token,
}: { search?: string; token?: string }) => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return howl(`/admin/get-subscriptions${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};


// >>>>>>>>>>>>>>>>> TRANSACTION <<<<<<<<<<<<<<<<<<<<


export const getTransactionsAdminApi = async ({
  token,
}: { token?: string }) => {
  return howl(`/admin/get-transations`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

// >>>>>>>>>>>>>>>>> CONTENTS <<<<<<<<<<<<<<<<<<<<

export const getPrivacyApi = async ({
  token,
}: { token?: string }) => {
  return howl(`/pages/data-privacy`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const updatePrivacyApi = async ({
  token,
  body
}: { token?: string ,body:{title:string, content:idk}}) => {
  return howl(`/pages/data-privacy`, {
    method: "POST",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    body
  });
};

export const getAboutApi = async ({
  token,
}: { token?: string }) => {
  return howl(`/pages/about-us`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const updateAboutApi = async ({
  token,
  body
}: { token?: string ,body:{title:string, content:idk}}) => {
  return howl(`/pages/about-us`, {
    method: "POST",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    body
  });
};

export const getTncApi = async ({
  token,
}: { token?: string }) => {
  return howl(`/pages/terms-conditions`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const updateTncApi = async ({
  token,
  body
}: { token?: string ,body:{title:string, content:idk}}) => {
  return howl(`/pages/terms-conditions`, {
    method: "POST",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    body
  });
};


// >>>>>>>>>>>>>>>>> DASHBOARD <<<<<<<<<<<<<<<<<<<<

export const getDashboardInfoApi = async ({ token }: { token?: string }) => {
  return howl("/admin/dashboard-info", {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getUserChartApi = async ({ token }: { token?: string }) => {
  return howl("/admin/user-chart", {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getGroupChartApi = async ({ token }: { token?: string }) => {
  return howl("/admin/group-chart", {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getTopChallengeChartApi = async ({
  filter,
  token,
}: { filter: 7 | 15 | 30; token?: string }) => {
  const query = `?filter=${filter}`;
  return howl(`/admin/top-challenge-chart${query}`, {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

export const getRevenueChartApi = async ({ token }: { token?: string }) => {
  return howl("/admin/revenue-chart", {
    method: "GET",
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
};

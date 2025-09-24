import { howl } from "@/lib/utils"
import { apiConfig, base_server } from "../config";

// >>>>>>>>>>>>>>>>> AUTH <<<<<<<<<<<<<<<<<<<<

export const loginApi = async ({
  body,
}: { body: { email:string,password:string } }) => {
  return howl("/login", {
    method: "POST",
    body,
  });
};

export const verifyOtpApi = async ({
  body,
}: { body: { otp: string } }) => {
  return howl("/verify-otp", {
    method: "POST",
    body,
  });
};

export const resendOtpApi = async ({
  body,
}: { body: { email: string } }) => {
  return howl("/resend-otp", {
    method: "POST",
    body,
  });
};

export const forgotPassApi = async ({
  body,
}: { body: { email: string } }) => {
  return howl("/forgot-password", {
    method: "POST",
    body,
  });
};

export const changePasswordApi = async ({
  body,
  token,
}: { body: { password: string; password_confirmation: string }; token: string }) => {
  return howl("/change-password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
};

export const updatePasswordApi = async ({
  body,
  token,
}: {
  body: {
    current_password: string;
    password: string;
    password_confirmation: string;
  };
  token: string;
}) => {
  return howl("/update-password", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
};

export const getProfileApi = async (token: string) => {
  return howl("/get-profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateProfileApi = async ({
  body,
  token,
}: {
  token: string;
  body: FormData;
}) => {
  const res = await fetch(`${apiConfig.baseUrl}/edit-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  
  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.statusText}`);
  }
  return res.json();
};

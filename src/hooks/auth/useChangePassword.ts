import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/auth";

type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordInput) =>
      changePassword(currentPassword, newPassword),
  });
}

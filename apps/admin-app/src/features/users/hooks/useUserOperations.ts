import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { EntityFormData } from "../components/EntityDetailDialog";
import { createToastMessages } from "@workspace/shared/lib/api-utils";
import { userApiClient } from "../utils/user-api-client";

const toastMessages = createToastMessages("User");

export function useUserOperations() {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = useCallback(async (userData: EntityFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Convert EntityFormData to CreateUserRequest
      const createData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        password: "TempPassword123!", // Default password
      };

      await userApiClient.createUser(createData);
      toast.success(toastMessages.createSuccess);
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(toastMessages.createError);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId: number, userData: EntityFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Convert EntityFormData to UpdateUserRequest
      const updateData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        status: userData.status,
        role: userData.role,
        emailVerified: userData.emailVerified,
      };

      await userApiClient.updateUser(userId, updateData);
      toast.success(toastMessages.updateSuccess);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(toastMessages.updateError);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (userId: number): Promise<boolean> => {
    setIsLoading(true);
    try {
      await userApiClient.deleteUser(userId);
      toast.success(toastMessages.deleteSuccess);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(toastMessages.deleteError);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createUser,
    updateUser,
    deleteUser,
    isLoading,
  };
}

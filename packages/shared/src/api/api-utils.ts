// Generic API utilities for CRUD operations
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// Generic CRUD operations interface
export interface CrudOperations<T, CreateData, UpdateData> {
  create: (data: CreateData) => Promise<T>;
  update: (id: number, data: UpdateData) => Promise<T>;
  delete: (id: number) => Promise<void>;
  getById: (id: number) => Promise<T>;
  getAll: (params?: any) => Promise<PaginatedResponse<T>>;
}

// Generic API client base class
export abstract class BaseApiClient<T, CreateData, UpdateData> {
  protected baseUrl: string;
  protected entityName: string;

  constructor(baseUrl: string, entityName: string) {
    this.baseUrl = baseUrl;
    this.entityName = entityName;
  }

  abstract create(data: CreateData): Promise<T>;
  abstract update(id: number, data: UpdateData): Promise<T>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<T>;
  abstract getAll(params?: any): Promise<PaginatedResponse<T>>;

  // Generic error handler
  protected handleError(error: any): ApiError {
    return {
      message: error.message || `Failed to ${this.entityName.toLowerCase()} operation`,
      status: error.status || 500,
      details: error.response?.data || error,
    };
  }

  // Generic success response
  protected createSuccessResponse<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
    };
  }
}

// Generic toast notification utilities
export const createToastMessages = (entityType: string) => ({
  createSuccess: `${entityType} created successfully!`,
  createError: `Failed to create ${entityType.toLowerCase()}. Please try again.`,
  updateSuccess: `${entityType} updated successfully!`,
  updateError: `Failed to update ${entityType.toLowerCase()}. Please try again.`,
  deleteSuccess: `${entityType} deleted successfully!`,
  deleteError: `Failed to delete ${entityType.toLowerCase()}. Please try again.`,
});

// Generic form validation utilities
export interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export const validateForm = (data: Record<string, any>, rules: ValidationRule[]): Record<string, string> => {
  const errors: Record<string, string> = {};

  rules.forEach(rule => {
    const value = data[rule.field];

    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[rule.field] = `${rule.field} is required`;
      return;
    }

    if (value && rule.minLength && value.toString().length < rule.minLength) {
      errors[rule.field] = `${rule.field} must be at least ${rule.minLength} characters`;
      return;
    }

    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      errors[rule.field] = `${rule.field} must be no more than ${rule.maxLength} characters`;
      return;
    }

    if (value && rule.pattern && !rule.pattern.test(value.toString())) {
      errors[rule.field] = `${rule.field} format is invalid`;
      return;
    }

    if (value && rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors[rule.field] = customError;
      }
    }
  });

  return errors;
};

// Generic form data types
export interface BaseEntityFormData {
  [key: string]: any;
}

export interface BaseEntityData {
  id: number;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
}

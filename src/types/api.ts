// API Types - Request/Response interfaces

export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

export interface ApiSuccess<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

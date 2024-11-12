import { Elysia, Static, StatusMap } from 'elysia';
import { Result } from '@ce-lab-mgmt/domain';
import { t as Type } from 'elysia';
import {
  BaseResponse,
  BaseResponseSchema,
  BaseResponseSchemaFn,
  GetAllReservationSchema,
} from '@ce-lab-mgmt/api-interfaces';
import { ElysiaCookie } from 'elysia/dist/cookies';
import { HTTPHeaders } from 'elysia/dist/types';

export type ElysiaSet = {
  headers: HTTPHeaders;
  status?: number | keyof StatusMap;
  /**
   * @deprecated Use inline redirect instead
   *
   * Will be removed in 1.2.0
   *
   * @example Migration example
   * ```ts
   * new Elysia()
   *     .get(({ redirect }) => redirect('/'))
   * ```
   */
  redirect?: string;
  /**
   * ! Internal Property
   *
   * Use `Context.cookie` instead
   */
  cookie?: Record<string, ElysiaCookie>;
};
// Base response schemas
export const ApiResponseSchema = <T extends ReturnType<typeof Type.Object>>(
  dataSchema: T
) =>
  Type.Object({
    success: Type.Boolean(),
    data: Type.Optional(dataSchema),
    error: Type.Optional(
      Type.Object({
        message: Type.String(),
        code: Type.Optional(Type.String()),
      })
    ),
    meta: Type.Optional(
      Type.Object({
        pagination: Type.Optional(
          Type.Object({
            total: Type.Number(),
            page: Type.Number(),
            limit: Type.Number(),
            totalPages: Type.Number(),
          })
        ),
      })
    ),
  });

export abstract class BaseController {
  protected app: Elysia<string>;

  constructor() {
    this.app = new Elysia({ prefix: this.getBasePath() });
    this.setupMiddleware();
    this.setupRoutes();
  }

  // Child classes can override to provide base path
  protected getBasePath(): string {
    return '/';
  }

  // Template method for setting up routes
  protected abstract setupRoutes(): void;

  // Hook for additional middleware
  protected setupMiddleware(): void {
    // Basic error handling
    this.app.onError(({ code, error, set }) => {
      const errorResponse = this.handleError(set, error);
      // set.status = errorResponse.status;
      return errorResponse;
    });
  }

  // Main handler for domain results
  protected handleResult<T, M>(
    set: ElysiaSet,
    result: Result<T>,
    options?: { status?: number; meta?: M }
  ) {
    if (result.isSuccess) {
      const response = {
        success: true,
        data: result.value,
      } as Static<typeof BaseResponseSchema>;
      if (options?.meta) {
        response.meta = options.meta;
      }
      console.log('result', response);
      console.log('BaseResponseSchema', result.value);
      return response;
    }

    const errorResponse = this.handleError(set, result.error);
    return errorResponse;
  }

  // Error handling helper
  protected handleError(set: ElysiaSet, error: Error): BaseResponse {
    const errorMapping: Record<string, number> = {
      ValidationError: 400,
      NotFoundError: 404,
      UnauthorizedError: 401,
      ForbiddenError: 403,
      ConcurrencyError: 409,
    };

    const status = errorMapping[error.constructor.name] || 500;
    const code = (error as any).code;
    set.status = status;
    return {
      success: false,
      error: {
        message: error.message,
        ...(code ? { code } : {}),
      },
    };
  }

  // Helper for pagination
  protected getPaginationMeta(params: {
    total: number;
    page: number;
    limit: number;
  }) {
    return {
      meta: {
        pagination: {
          total: params.total,
          page: params.page,
          limit: params.limit,
          totalPages: Math.ceil(params.total / params.limit),
        },
      },
    };
  }

  protected getUserId(
    headers: Record<string, string | undefined>
  ): Result<string> {
    const userId = headers['x-user-id'];
    if (!userId) {
      return Result.fail(new Error('Unauthorized: Missing user ID'));
    }
    return Result.ok(userId);
  }

  protected getRoles(headers: Record<string, string | undefined>): string[] {
    return headers['x-user-roles']?.split(',') || [];
  }

  // Helper for authorization check
  protected checkAuthorization(
    headers: Record<string, string | undefined>
  ): Result<string> {
    const userId = headers['x-user-id'];
    if (!userId) {
      return Result.fail(new Error('Unauthorized: Missing user ID'));
    }
    return Result.ok(userId);
  }

  // Getter for the Elysia instance
  getApp() {
    return this.app;
  }
}

// Example auth middleware factory
export const createAuthMiddleware = (roles: string[] = []) => {
  return async ({ userData, headers, set }: any) => {
    const userId = headers['x-user-id'];
    const userRoles = headers['x-user-roles']?.split(',') || [];
    userData.uid = userId;
    userData.roles = userRoles;
    if (!userId) {
      set.status = 401;
      return {
        success: false,
        error: {
          message: 'Unauthorized: Missing user ID',
          code: 'UNAUTHORIZED',
        },
      };
    }

    if (roles.length > 0 && !roles.some((role) => userRoles.includes(role))) {
      set.status = 403;
      return {
        success: false,
        error: {
          message: 'Forbidden: Insufficient permissions',
          code: 'FORBIDDEN',
        },
      };
    }
  };
};

import { t as Type, Elysia, t } from 'elysia';
import {
  BaseController,
  createAuthMiddleware,
  ElysiaSet,
} from '@ce-lab-mgmt/infrastructure';
import { ReservationService } from '../../domain/services/reservation.service';
import {
  CreateReservationSchema,
  UpdateReservationSchema,
  ReservationQuerySchema,
} from './reservation.schema';
import { NotFoundError } from '@ce-lab-mgmt/domain';
import {
  BaseResponse,
  BaseResponseSchema,
  BaseResponseSchemaFn,
  GetAllReservationSchema,
  GetReservationResponseSchema,
  RequestReservationFormSchema,
} from '@ce-lab-mgmt/api-interfaces';

export class ReservationController extends BaseController {
  constructor(private readonly reservationService: ReservationService) {
    super();
  }

  protected getBasePath(): string {
    return '/reservations';
  }

  protected setupRoutes(): void {
    // List reservations
    this.app.guard(
      {
        beforeHandle: [createAuthMiddleware(['customer'])],
      },
      (app) =>
        app
          .get(
            '/',
            async ({ query, headers, set }) => {
              // console.log('query', query);
              const authResult = this.checkAuthorization(headers);
              // console.log('authResult', authResult);
              if (authResult.isFailure) {
                return this.handleResult(set, authResult);
              }

              const result = await this.reservationService.getReservations({
                customerId: authResult.value,
                page: query.page || 1,
                limit: query.limit || 10,
                status: query.status,
                fromDate: query.fromDate ? new Date(query.fromDate) : undefined,
                toDate: query.toDate ? new Date(query.toDate) : undefined,
              });
              console.log('dfadfs', {
                //     success: true,
                data: result.value.items,
                ...this.getPaginationMeta({
                  total: result.value.total,
                  page: query.page || 1,
                  limit: query.limit || 10,
                }),
              });

              if (result.isSuccess) {
                return {
                  success: true,
                  data: result.value.items.map((r) => r.self),
                  ...this.getPaginationMeta({
                    total: result.value.total,
                    page: query.page || 1,
                    limit: query.limit || 10,
                  }),
                };
              }

              return this.handleReservationError(set, result.error);
            },
            {
              query: ReservationQuerySchema,
              response: BaseResponseSchemaFn(GetAllReservationSchema),
            }
          )
          .get(
            '/:id',
            async ({ params, headers, set }) => {
              const uid = this.getUserId(headers).value;
              const result = await this.reservationService.getReservation(
                params.id,
                uid
              );

              return this.handleResult(set,result);
            },
            {
              params: Type.Object({
                id: Type.String({ format: 'uuid' }),
              }),
              response: BaseResponseSchemaFn(GetReservationResponseSchema),
            }
          )
          .post(
            '/',
            async ({ body, headers, set }) => {
              const uid = this.getUserId(headers).value;
              const result = await this.reservationService.createReservation(
                { uid },
                body
              );

              return this.handleResult(set, result, { status: 201 });
            },
            {
              body: RequestReservationFormSchema,
            }
          )
          .patch(
            '/:id',
            async ({ params, body, headers, set }) => {
              const uid = this.getUserId(headers).value;
              const result = await this.reservationService.updateReservation(
                params.id,
                uid,
                body
              );

              return this.handleResult(set, result);
            },
            {
              params: Type.Object({
                id: Type.String({ format: 'uuid' }),
              }),
              body: UpdateReservationSchema,
            }
          )
    );

    this.app.group(
      '/admin',
      {
        beforeHandle: [createAuthMiddleware(['admin'])],
      },
      (adminGroup) =>
        adminGroup
          .get(
            '/',
            async ({ query, set }) => {
              const result = await this.reservationService.getAllReservations({
                page: query.page || 1,
                limit: query.limit || 10,
                status: query.status,
                fromDate: query.fromDate ? new Date(query.fromDate) : undefined,
                toDate: query.toDate ? new Date(query.toDate) : undefined,
              });

              if (result.isSuccess) {
                return {
                  success: true,
                  data: result.value.items,
                  ...this.getPaginationMeta({
                    total: result.value.total,
                    page: query.page || 1,
                    limit: query.limit || 10,
                  }),
                };
              }

              return this.handleResult(set, result);
            },
            {
              query: ReservationQuerySchema,
            }
          )
          .put(
            '/:id/approve',
            async ({ params, set }) => {
              const result = await this.reservationService.approveReservation(
                params.id
              );
              return this.handleResult(set, result);
            },
            {
              params: Type.Object({
                id: Type.String({ format: 'uuid' }),
              }),
            }
          )
          .put(
            '/:id/reject',
            async ({ params, set }) => {
              const result = await this.reservationService.rejectReservation(
                params.id
              );
              return this.handleResult(set, result);
            },
            {
              params: Type.Object({
                id: Type.String({ format: 'uuid' }),
              }),
            }
          )
    );
  }

  // Error handling for common scenarios
  protected handleReservationError(set: ElysiaSet, error: Error): BaseResponse {
    if (error instanceof NotFoundError) {
      set.status = 404;
      return {
        success: false,
        error: {
          message: error.message,
          code: 'RESERVATION_NOT_FOUND',
        },
      };
    }

    // Delegate other errors to base handler
    return super.handleError(set, error);
  }
}

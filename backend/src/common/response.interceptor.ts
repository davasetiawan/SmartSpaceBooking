import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((payload: { message?: string; data?: unknown } | unknown) => {
        const isWrapped =
          payload !== null &&
          typeof payload === 'object' &&
          ('data' in (payload as object) || 'message' in (payload as object));
        const wrapped = isWrapped
          ? (payload as { message?: string; data?: unknown })
          : { data: payload };
        return {
          status: true,
          statusCode,
          message: wrapped.message ?? 'Success',
          data: wrapped.data ?? null,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

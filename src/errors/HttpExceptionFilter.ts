import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logger = new Logger();
    logger.error(request.originalUrl);
    logger.error(exception.getResponse());

    const exceptionResponse: any =
      status === 500
        ? { message: `서버 내부 오류, 담당자에게 문의해 주세요 🤔 ` }
        : exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: exceptionResponse.message,
      error: exceptionResponse.error,
    });
  }
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const res = exceptionResponse as Record<string, unknown>;

    const message = (res.message as string | string[]) || exception.message;

    const customStatus = (res.status as string) || "error";

    const errorResponse = {
      status: customStatus,
      message,
    };

    response.status(status).json(errorResponse);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 5000);
  const env = configService.get<string>("NODE_ENV");

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: configService.get<string>("CLIENT_URL"),
    credentials: true,
  });

  try {
    await app.listen(port);
    Logger.log(`Server running in ${env} mode on port ${port}`);
  } catch (error) {
    Logger.error(`server failed to start due to ${error}`);
  }
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);

  const server = app.getHttpServer() as Server;

  const shutdown = async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await app.close();
  };

  process.once('SIGTERM', () => void shutdown());
  process.once('SIGINT', () => void shutdown());
}

void bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('DB_HOST');
        const port = config.get<string>('DB_PORT');
        const username = config.get<string>('DB_USER');
        const password = config.get<string>('DB_PASSWORD');
        const database = config.get<string>('DB_NAME');

        for (const [k, v] of Object.entries({
          host,
          port,
          username,
          password,
          database,
        })) {
          if (!v)
            throw new Error(`Missing DB config: ${k}. Check apps/api/.env`);
        }

        return {
          type: 'postgres' as const,
          host,
          port: Number(port),
          username,
          password,
          database,
          synchronize: false,
          autoLoadEntities: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

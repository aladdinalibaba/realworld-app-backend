import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(service: ConfigService) {
        const config = service.get('database');

        return {
          type: config.type,
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.name,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';

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

        console.log(config);

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

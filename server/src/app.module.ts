import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGODB_URI"),
        connectionFactory: async (connection: Connection) => {
          await connection.db
            ?.admin()
            .ping()
            .then(() => {
              Logger.log(
                `MongoDB connected successfully in ${
                  config.get<string>("NODE_ENV") ?? "development"
                } mode`,
              );
            })
            .catch((err) => {
              Logger.error(`MongoDB connection error: ${err}`);
            });

          return connection;
        },
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ClusterModule } from './cluster/cluster.module';
import { MicroserviceClientModule } from './microservice-client/microservice-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    DatabaseModule,
    ClusterModule,
    MicroserviceClientModule,
  ],
  providers: [AppService],
})
export class AppModule {}

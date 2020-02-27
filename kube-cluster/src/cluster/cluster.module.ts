import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClusterSchema } from './cluster.schema';
import { ClusterController } from './cluster.controller';
import { ClusterService } from './cluster.service';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cluster', schema: ClusterSchema }]),
    MicroserviceClientModule,
  ],
  controllers: [ClusterController],
  providers: [ClusterService],
})
export class ClusterModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClusterSchema } from './cluster.schema';
import { ClusterController } from './cluster.controller';
import { ClusterService } from './cluster.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cluster', schema: ClusterSchema }]),
  ],
  controllers: [ClusterController],
  providers: [ClusterService],
})
export class ClusterModule {}

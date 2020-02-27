import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceSchema } from './resource.schema';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Resource', schema: ResourceSchema }]),
    MicroserviceClientModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}

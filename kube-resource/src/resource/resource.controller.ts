import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Cluster } from './dto/cluster';

interface KafkaMessage<T> {
  value: T;
}

@Controller('')
export class ResourceController {

  constructor(private readonly resourceService: ResourceService, private client: ClientKafka) {}

  @Get('cluster/:id')
  public async getResource(@Param() param, @Res() res) {
    const clusterId = param.id;
    const resources = await this.resourceService.findAll(clusterId);

    return res.status(HttpStatus.OK).json(resources);
  }

  @Post('cluster/:id')
  public async createResource(@Body() createResourceDto: CreateResourceDto, @Res() res) {
    const resource = await this.resourceService.create(createResourceDto);

    await this.client.emit('resource.created', JSON.stringify(resource));

    return res.status(HttpStatus.OK).json(resource);
  }

  @Delete(':id')
  public async deleteResource(@Param() param, @Res() res) {
    const resourceId = param.id;

    const resource = await this.resourceService.delete(resourceId);

    await this.client.emit('resource.deleted', JSON.stringify(resource));

    return res.status(HttpStatus.OK).json(resource);
  }

  @MessagePattern('cluster.deleted')
  async clusterDeleted(@Payload() message: KafkaMessage<Cluster>) {
    console.log('KAFKA MESSAGE: cluster.deleted');
    const cluster = message.value;
    await this.resourceService.deleteResourcesForCluster(cluster._id);
  }
}

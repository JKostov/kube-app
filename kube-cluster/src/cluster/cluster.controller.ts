import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Resource } from './dto/resource';

interface KafkaMessage<T> {
  value: T;
}

@Controller('')
export class ClusterController{

  constructor(private readonly clusterService: ClusterService, private client: ClientKafka) {}

  @Get('')
  public async getClusters(@Req() req, @Res() res) {
    const clusters = await this.clusterService.findAll();

    return res.status(HttpStatus.OK).json(clusters);
  }

  @Get(':id')
  public async getClusterById(@Param() param, @Res() res) {
    const cluster = await this.clusterService.findById(param.id);

    return res.status(HttpStatus.OK).json(cluster);
  }

  @Post()
  public async createCluster(@Body() createClusterDto: CreateClusterDto, @Res() res) {
    const cluster = await this.clusterService.create(createClusterDto);

    return res.status(HttpStatus.OK).json(cluster);
  }

  @Delete(':id')
  public async deleteCluster(@Param() param, @Res() res) {
    const clusterId = param.id;
    const cluster = await this.clusterService.delete(clusterId);

    await this.client.emit('cluster.deleted', JSON.stringify(cluster));

    return res.status(HttpStatus.OK).json(cluster);
  }

  @MessagePattern('resource.created')
  async resourceCreated(@Payload() message: KafkaMessage<Resource>) {
    console.log('KAFKA MESSAGE: resource.created');
    const resource = message.value;
    await this.clusterService.addResource(resource.clusterId, resource);
  }

  @MessagePattern('resource.deleted')
  async resourceDeleted(@Payload() message: KafkaMessage<Resource>) {
    console.log('KAFKA MESSAGE: resource.deleted');
    const resource = message.value;
    await this.clusterService.deleteResource(resource.clusterId, resource);
  }
}

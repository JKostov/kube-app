import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { CreateClusterDto } from './dto/create-cluster.dto';

@Controller('')
export class ClusterController {

  constructor(private readonly clusterService: ClusterService) { }

  @Get('')
  public async getClusters(@Req() req, @Res() res) {
    const clusters = await this.clusterService.findAll();

    return res.status(HttpStatus.OK).json(clusters);
  }

  @Post()
  public async createCluster(@Body() createClusterDto: CreateClusterDto, @Res() res) {
    const cluster = await this.clusterService.create((createClusterDto));

    return res.status(HttpStatus.OK).json(cluster);
  }
}

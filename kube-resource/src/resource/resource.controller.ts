import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';

@Controller('')
export class ResourceController {

  constructor(private readonly resourceService: ResourceService) { }

  @Get('cluster/:id')
  public async getResource(@Param() param, @Res() res) {
    const clusterId = param.id;
    const resources = await this.resourceService.findAll(clusterId);

    return res.status(HttpStatus.OK).json(resources);
  }

  @Post('cluster/:id')
  public async createResource(@Body() createResourceDto: CreateResourceDto, @Res() res) {
    const resource = await this.resourceService.create(createResourceDto);

    return res.status(HttpStatus.OK).json(resource);
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Resource } from './resource.model';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourceService {
  constructor(@InjectModel('Resource') private readonly resourceModel: Model<Resource>) { }

  async findAll(clusterId: string): Promise<Resource[]> {
    return await this.resourceModel.find({ clusterId }).exec();
  }

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const createdResource = new this.resourceModel(createResourceDto);
    return await createdResource.save();
  }

  async delete(resourceId: string): Promise<Resource> {
    return this.resourceModel.findOneAndRemove({ _id: resourceId }).exec();
  }

  async deleteResourcesForCluster(clusterId: string): Promise<void> {
    return this.resourceModel.delete({ clusterId }).exec();
  }
}

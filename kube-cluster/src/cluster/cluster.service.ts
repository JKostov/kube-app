import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cluster } from './cluster.model';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { Resource } from './dto/resource';

@Injectable()
export class ClusterService {
  constructor(@InjectModel('Cluster') private readonly clusterModel: Model<Cluster>) { }

  async findAll(): Promise<Cluster[]> {
    return this.clusterModel.find().exec();
  }

  async findById(id: string): Promise<Cluster> {
    return this.clusterModel.findOne({ _id: id }).exec();
  }

  async create(createClusterDto: CreateClusterDto): Promise<Cluster> {
    const createdCluster = new this.clusterModel(createClusterDto);
    return createdCluster.save();
  }

  async delete(clusterId: string): Promise<Cluster> {
    return this.clusterModel.findOneAndRemove({ _id: clusterId }).exec();
  }

  async addResource(id: string, resource: Resource): Promise<void> {
    const cluster = await this.clusterModel.findOne({ _id: id });
    cluster.workers += 1;
    cluster.cpus += resource.cpus;
    cluster.memory += resource.memory;
    cluster.storageMemory += resource.storageMemory;
    await cluster.save();
  }

  async deleteResource(id: string, resource: Resource): Promise<void> {
    const cluster = await this.clusterModel.findOne({ _id: id });
    cluster.workers -= 1;
    cluster.cpus -= resource.cpus;
    cluster.memory -= resource.memory;
    cluster.storageMemory -= resource.storageMemory;
    await cluster.save();
  }
}

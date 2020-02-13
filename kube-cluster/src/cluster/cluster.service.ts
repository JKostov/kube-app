import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cluster } from './cluster.model';
import { CreateClusterDto } from './dto/create-cluster.dto';

@Injectable()
export class ClusterService {
  constructor(@InjectModel('Cluster') private readonly clusterModel: Model<Cluster>) { }

  async findAll(): Promise<Cluster[]> {
    return await this.clusterModel.find().exec();
  }

  async create(createClusterDto: CreateClusterDto): Promise<Cluster> {
    const createdCluster = new this.clusterModel(createClusterDto);
    return await createdCluster.save();
  }
}

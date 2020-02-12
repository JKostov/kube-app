import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseFactory implements MongooseOptionsFactory {

  constructor(private readonly configService: ConfigService) { }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get('MONGO_URL'),
      useNewUrlParser: true,
    };
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseFactory } from './database.factory';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [MongooseModule.forRootAsync({
    useClass: DatabaseFactory,
  })],
})
export class DatabaseModule {}

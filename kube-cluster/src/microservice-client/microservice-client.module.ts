import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    {
      provide: ClientKafka,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'kube-cluster',
              brokers: [configService.get('KAFKA_URL')],
            },
            consumer: {
              groupId: 'kube-cluster',
            },
          }
        })
      },
      inject: [ConfigService],
    }
  ],
  exports: [ClientKafka],
})
export class MicroserviceClientModule {}

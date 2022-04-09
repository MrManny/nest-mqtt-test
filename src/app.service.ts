import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  Client,
  ClientMqtt,
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  @Client({ transport: Transport.MQTT })
  client: ClientMqtt;

  async onApplicationBootstrap(): Promise<void> {
    await this.client.connect();
    this.client.emit('message', 'Hello from Nest.js');
  }

  getHello(): string {
    return 'Hello World!';
  }

  @EventPattern('message')
  handleEvent(data: unknown) {
    this.logger.log('Received event', data);
  }

  @MessagePattern('message')
  handleMessage(@Payload() data: unknown) {
    this.logger.log('Received message', data);
  }
}

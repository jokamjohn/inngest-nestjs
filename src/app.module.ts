import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Queue } from './queue.provider';
import { QueueMiddleware } from './queue.middleware';
import { SendEmailJob } from './sendEmail';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Queue, SendEmailJob],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * NestJS middleware in `main.ts` does not have access to either a parsed or
     * raw body, whereas middleware here does.
     *
     * This means it's critical to add the Inngest handler _here_ so that we can
     * appropriately parse the body of incoming requests from Inngest or the
     * Inngest dev server.
     */
    consumer.apply(QueueMiddleware).forRoutes('/api/inngest');
  }
}

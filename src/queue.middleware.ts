import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { serve } from 'inngest/express';
import { Queue } from './queue.provider';
import { SendEmailJob } from './sendEmail';

@Injectable()
export class QueueMiddleware implements NestMiddleware {
  constructor(
    private readonly queue: Queue,
    private readonly emailJob: SendEmailJob,
  ) {}
  use(req: Request, res: Response) {
    const handler = serve(this.queue.config(), [this.emailJob.process()], {
      signingKey: this.queue.signingKey,
      logLevel: 'debug',
    });
    handler(req, res);
  }
}

import { Injectable } from '@nestjs/common';
import { Queue, SendEmailPayload } from "../queue.provider";

@Injectable()
export class SendEmailJob {
  constructor(private readonly queue: Queue) {}

  async send(data: SendEmailPayload) {
    return await this.queue.config().send({
      name: `bb/send-email`,
      data,
    });
  }

  process() {
    return this.queue.handleJob(
      {
        name: `Send email`,
      },
      { event: `bb/send-email` },
      async ({ event, step }) => {
        const { to, subject, text, delayByMs } = event.data;
        await step.sleep(delayByMs);
        await step.run(`Send delayed email`, async () => {});
      },
    );
  }
}

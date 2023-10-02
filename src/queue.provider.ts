import { Injectable } from '@nestjs/common';
import { Inngest } from 'inngest';

export type SendEmailPayload = {
  to: string[];
  subject: string;
  text: string;
  delayByMs: number | string;
};

@Injectable()
export class Queue {
  constructor() {}

  private inngest = new Inngest({
    name: `Operations Service`,
    eventKey:
      'xHKDOCM7XyfJVz_xJn2Zt77PWtKS5Ipb-0SFQ5V681XwokSl0wiEDy6GhoeUegx3FioUjGGww8NtB3JEcbGSdw',
  });

  // public handleJob = this.inngest.createFunction;
  // public send = this.inngest.send;
  public signingKey =
    'signkey-test-9db8fe94528d2ebab18a5e5c9907241ddc5012da0b7c67c6cff8c7390e2f0a0b';
  public config() {
    return this.inngest;
  }

  public handleJob(...args) {
    // @ts-expect-error Yolo
    return this.inngest.createFunction(...args);
  }

  public send(...args) {
    // @ts-expect-error Yolo
    return this.inngest.send(...args);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): void {
    return;
  }
}

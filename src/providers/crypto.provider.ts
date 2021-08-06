import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  hashing = async ({ plainText }: { plainText: string }): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plainText, salt);
  };

  compareHashAndPlanText = async ({
    plainText,
    hash,
  }: {
    plainText: string;
    hash: string;
  }): Promise<boolean> => {
    return await bcrypt.compare(plainText, hash);
  };
}

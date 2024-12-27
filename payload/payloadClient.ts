import { getPayload } from 'payload/dist/payload';
import config from '../payload.config';

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is missing');
}

export const getPayloadClient = async () => {
  if (!global.payload) {
    global.payload = await getPayload({
      secret: process.env.PAYLOAD_SECRET,
      config: config,
    });
  }
  return global.payload;
};


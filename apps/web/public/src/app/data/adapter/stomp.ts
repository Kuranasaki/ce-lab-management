import { Client, IFrame } from '@stomp/stompjs';

export class RabbitMQResponse {
  code: number;
  constructor({ code }: { code: number }) {
    this.code = code;
  }
}

export async function sendToQueue<T>(
  queue: string,
  data: T
): Promise<RabbitMQResponse> {
  const rabbitMQUrl = import.meta.env.VITE_RABBITMQ_URL;
  const rabbitMQUsername = import.meta.env.VITE_RABBITMQ_USERNAME || 'guest';
  const rabbitMQPassword = import.meta.env.VITE_RABBITMQ_PASSWORD || 'guest';
  const connectionTimeoutMs = 10000;

  if (!rabbitMQUrl) {
    return new RabbitMQResponse({ code: 500 });
  }

  return new Promise<RabbitMQResponse>((resolve) => {
    const client = new Client({
      brokerURL: rabbitMQUrl,
      connectHeaders: {
        login: rabbitMQUsername,
        passcode: rabbitMQPassword,
      },
      reconnectDelay: 5000,
    });

    const timeout = setTimeout(() => {
      client.deactivate();
      resolve(new RabbitMQResponse({ code: 408 }));
    }, connectionTimeoutMs);

    client.onConnect = () => {
      clearTimeout(timeout);

      client.publish({
        destination: `/queue/${queue}`,
        body: JSON.stringify(data),
        headers: {
          persistent: 'true',
        },
      });

      client.deactivate();
      resolve(new RabbitMQResponse({ code: 200 }));
    };

    client.onStompError = (frame: IFrame) => {
      clearTimeout(timeout);
      resolve(new RabbitMQResponse({ code: 500 }));
    };

    client.activate();
  });
}

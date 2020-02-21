import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import PushAdapter, {
  PushAdapterBody,
  PushAdapterResponse,
} from 'parse-server/lib/Adapters/Push/PushAdapter';
import { Installation } from 'parse/node';
import Logger from 'parse-server/lib/logger';

const expo: Expo = new Expo();

class ExpoPushAdapter implements PushAdapter {
  public feature: { immediatePush: boolean };

  constructor() {
    this.feature = { immediatePush: true };
  }

  send(
    {
      data: { alert: body, misc: data, title, priority, badge },
    }: PushAdapterBody,
    installations: Installation[],
  ): Promise<PushAdapterResponse[]> {
    const messages: ExpoPushMessage[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const installation of installations) {
      const { deviceToken, badge: lastBadge } = installation;
      // eslint-disable-next-line no-continue
      if (!Expo.isExpoPushToken(deviceToken)) continue;
      messages.push({
        to: deviceToken,
        title,
        priority,
        body,
        data: { installation, ...data },
        badge: badge === 'increment' ? lastBadge + 1 : badge,
        // installation,
      });
    }

    const chunks = expo.chunkPushNotifications(messages);
    const promises: Promise<PushAdapterResponse[]>[] = chunks.map(
      chunk =>
        new Promise((resolve, reject) => {
          expo
            .sendPushNotificationsAsync(chunk)
            .then(tickets => {
              resolve(
                tickets.map((ticket, index) => {
                  if (ticket.status === 'error')
                    return {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      err: ticket.details!.error || 'Uknown',
                      // device: chunk[index].installation,
                      transmitted: false,
                    };
                  return {
                    err: null,
                    // device: chunk[index].installation,
                    transmitted: true,
                  };
                }),
              );
            })
            .catch(e => {
              reject(e);
            });
        }),
    );
    return Promise.all<PushAdapterResponse[]>(promises).then(resolutions => {
      return resolutions.reduce(
        (p: PushAdapterResponse[], c: PushAdapterResponse[]) => [...p, ...c],
      );
    });
  }
}

export default (): ExpoPushAdapter => new ExpoPushAdapter();

import { useRef } from 'react';

// Type definitions for the hook
export interface EchoChannel {
    channel: string;
    event: string;
    callback: (data: any) => void;
}

export interface EchoHookResult {
    listen: () => void;
    stopListening: () => void;
}

/**
 * Custom hook to handle multiple Echo public channels
 * @param channels Array of channel configurations
 * @returns Object with listen and stopListening functions for all channels
 */
export const useMultipleEchoPublic = (
    channels: EchoChannel[],
): EchoHookResult => {
    const listenersRef = useRef<any[]>([]);

    const listen = () => {
        if (!window.Echo) {
            console.error('Echo is not initialized');
            return;
        }

        channels.forEach(({ channel, event, callback }) => {
            console.log(`Listening to channel: ${channel}, event: ${event}`);
            const listener = window.Echo.channel(channel).listen(
                event,
                callback,
            );
            listenersRef.current.push({ channel, event, listener });
        });
    };

    const stopListening = () => {
        if (!window.Echo) {
            console.error('Echo is not initialized');
            return;
        }

        listenersRef.current.forEach(({ channel }) => {
            console.log(`Stopping listener on channel: ${channel}`);
            window.Echo.leaveChannel(channel);
        });

        listenersRef.current = [];
    };

    return {
        listen,
        stopListening,
    };
};

/**
 * Hook specifically for ticket-related channels
 * @param userId User area ID for channel subscription
 * @param onTicketCreated Callback for ticket creation
 * @param onTicketUpdated Callback for ticket update
 * @param onTicketDerived Callback for ticket derivation (optional)
 * @returns Object with listen and stopListening functions
 */
export const useTicketEcho = (
    userId: number,
    onTicketCreated: (data: any) => void,
    onTicketUpdated: (data: any) => void,
    onTicketDerived?: (data: any) => void,
    onTicketCalled?: (data: any) => void,
): EchoHookResult => {
    const channels: EchoChannel[] = [
        {
            channel: `ticket-created.${userId}`,
            event: 'TicketCreated',
            callback: onTicketCreated,
        },
        {
            channel: `ticket-updated.${userId}`,
            event: 'UpdatedTicket',
            callback: onTicketUpdated,
        },
    ];

    // Add derived channel if callback is provided
    if (onTicketDerived) {
        channels.push({
            channel: `ticket-derived.${userId}`,
            event: 'TicketDerived',
            callback: onTicketDerived,
        });
    }

    if (onTicketCalled) {
        channels.push({
            channel: `ticket-called.${userId}`,
            event: 'TicketCalled',
            callback: onTicketCalled,
        });
    }

    return useMultipleEchoPublic(channels);
};

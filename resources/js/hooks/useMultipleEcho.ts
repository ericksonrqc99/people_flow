import { useEchoPublic } from '@laravel/echo-react';
import { useCallback } from 'react';

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
export const useMultipleEchoPublic = (channels: EchoChannel[]): EchoHookResult => {
    // Create Echo hooks for each channel
    const echoHooks = channels.map(({ channel, event, callback }) =>
        useEchoPublic(channel, event, callback)
    );

    // Function to start listening on all channels
    const listen = useCallback(() => {
        echoHooks.forEach(hook => hook.listen());
    }, [echoHooks]);

    // Function to stop listening on all channels
    const stopListening = useCallback(() => {
        echoHooks.forEach(hook => hook.stopListening());
    }, [echoHooks]);

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
    onTicketDerived?: (data: any) => void
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

    return useMultipleEchoPublic(channels);
};

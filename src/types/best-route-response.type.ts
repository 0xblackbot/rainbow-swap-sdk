import {BestRouteDisplayData} from './best-route-display-data.type';
import {CalculatedSwapRoute} from './calculated-swap-route.type';
import {Message} from '../interfaces/message.interface';

export type BestRouteResponse = {
    /**
     * A user-friendly representation of the best route details.
     */
    displayData: BestRouteDisplayData;

    /**
     * An array of messages that should be signed and sent to the blockchain to execute the swap.
     *
     * - For TON dApps, it is recommended to use `@tonconnect/sdk`.
     * - If the `senderAddress` parameter in the request was not set, an empty array (`[]`) will be returned.
     * - An empty array in other cases indicates that no route was found between the input asset and the output asset.
     */
    swapMessages: Message[];

    /**
     * @deprecated This field is deprecated and will be removed in the next major release.
     * Please use `displayData.route` instead for improved performance and features.
     */
    bestRoute: CalculatedSwapRoute[];

    messageCount: number;
};

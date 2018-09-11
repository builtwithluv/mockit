import { NetworkProfile } from '../enums';

export default function getNetworkProfiles(profile) {
    switch (profile) {
        case NetworkProfile.REGULAR_3G: {
            // kb -> b
            return { down: 750 * 1000, up: 250 * 1000, rtt: 100 };
        }

        case NetworkProfile.REGULAR_4G: {
            // Mb -> b
            return { down: 4 * 1000 * 1000, up: 3 * 1000 * 1000, rtt: 20 };
        }

        case NetworkProfile.WIFI: {
            // Mb -> b
            return { down: 30 * 1000 * 1000, up: 15 * 1000 * 1000, rtt: 2 }
        }

        case NetworkProfile.DISABLED: {
            return null;
        }
    }
}

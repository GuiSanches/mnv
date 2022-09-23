// This class is used to update listeners
export default interface NetworkListener {
    type: listenerType;
    onNetworkChanged(): void;

    destroyListener(): void;
}

type listenerType = 'network' | 'info';
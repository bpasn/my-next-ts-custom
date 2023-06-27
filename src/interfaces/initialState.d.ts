interface IInitialState {
    Alert: IAlert
}

interface IAlert {
    message: string,
    show: boolean;
    severity: "error" | "warning" | "info" | "success"
}
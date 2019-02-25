export interface CurveballAccount {
    email: string;
    firstName: string;
    lastName: string;
    network: {
        id: number;
        name: string
    };
    token: string;
}

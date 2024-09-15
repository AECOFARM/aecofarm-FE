export interface Alarm {
    status: string;
    userName: string;
    memberStatus: string;
    contractId: number;
    itemName: string;
    image: string;
    time: Date;
}

export interface AlarmListData {
    lending: Alarm[];
    borrowing: Alarm[];
}
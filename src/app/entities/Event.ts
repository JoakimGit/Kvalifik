export class Event {
    id;
    title: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    responsible?: string;
    media?: string;
}
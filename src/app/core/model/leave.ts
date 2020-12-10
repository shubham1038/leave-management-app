import { Employee } from './employee';

export class Leave{
    public reqId: string;
    public leaveType: string;
    public startDate: string;
    public endDate: string;
    public reason: string;
    public employee:Employee;
}
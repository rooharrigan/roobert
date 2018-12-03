import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Token } from 'types_logic';
import { TrackEventUserEventType } from 'types_track_api';

@Entity("user_events")
export class UserEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "bigint"
    })
    date: number;

    @Column({
        type: "varchar",
        length: 255,
    })
    event_name: TrackEventUserEventType;

    @Column({
        type: "varchar",
        length: 38,
    })
    impression_token: Token;

    @Column({
        type: "varchar",
        length: 38
    })
    visitor_token: string;
}

export default UserEvent;

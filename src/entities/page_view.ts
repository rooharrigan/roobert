import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEventPageViewImpressionType } from 'types_track_api';

@Entity("page_views")
export class PageViewEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 2038
    })
    url: string;

    @Column({
        type: "bigint"
    })
    date: number;

    @Column({
        type: "int"
    })
    view_duration_ms: number;

    @Column({
        type: "varchar",
        length: 255,
    })
    impression_type: TrackEventPageViewImpressionType;

    @Column({
        type: "varchar",
        length: 38,
        unique: true,
    })
    impression_token: string;

    @Column({
        type: "varchar",
        length: 38
    })
    session_token: string;

    @Column({
        type: "varchar",
        length: 38
    })
    visitor_token: string;
}

export default PageViewEvent;

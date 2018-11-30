import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("page_views")
export class PageViews {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 2038
    })
    url: string;    // string is varchar

    @Column()
    date: number;

    @Column()
    duration_ms: number;
}

export default PageViews;

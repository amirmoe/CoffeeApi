import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Brew {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;
}
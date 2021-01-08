import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('BTCNodeInfo')
export class BTCNodeInfo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 30,
        type: 'varchar'
    })
    peerHost: string;
    @Column({
        length: 30,
        type: 'varchar'
    })
    username: string;
    @Column({
        length: 30,
        type: 'varchar'
    })
    password: string;
    @Column({ type: 'int' })
    rpcPort: number;
    @Column({ type: 'int' })
    peerPort: number;

}
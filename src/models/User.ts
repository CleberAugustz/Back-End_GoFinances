// import { uuid } from 'uuidv4'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users') 
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    avatar: string;

    @UpdateDateColumn()
    updated_at: Date;

    // constructor({provider, date}: Omit<Ap pointment, 'id'>) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;

    // }
}

export default User;
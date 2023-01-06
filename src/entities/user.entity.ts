import {
    Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { AuthEntity } from './auth.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  username: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToOne(() => AuthEntity, (user) => user.id, { eager: true, cascade: true })
  @JoinColumn()
  auth: AuthEntity
}

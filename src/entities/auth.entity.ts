import * as bcrypt from 'bcrypt'
import {
    BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }
}

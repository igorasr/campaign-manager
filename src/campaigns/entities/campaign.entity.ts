import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @CreateDateColumn()
  dataCadastro: Date;

  @Column({ type: 'timestamp' })
  dataInicio: Date;

  @Column({ type: 'timestamp' })
  dataFim: Date;

  @Column({
    type: 'enum',
    enum: ['ativa', 'pausada', 'expirada'],
    default: 'ativa'
  })
  status: 'ativa' | 'pausada' | 'expirada';

  @Column()
  categoria: string;

  @DeleteDateColumn()
  deletedAt?: Date; // Soft delete
}

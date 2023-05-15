import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateNoteDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  url?: string;
  //   description String
  //   url String
  //   createdAt DateTime @default(now())
  //   updatedAt DateTime @updatedAt
  //   usersId Int
  //   user User @relation(fields: [usersId], references: [id])
  //   @@map("notes")
}

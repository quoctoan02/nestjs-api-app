import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class InsertNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;
  //   description String
  //   url String
  //   createdAt DateTime @default(now())
  //   updatedAt DateTime @updatedAt
  //   usersId Int
  //   user User @relation(fields: [usersId], references: [id])
  //   @@map("notes")
}

import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  getNotes(userId: number) {
    return this.prismaService.note.findMany({ where: { userId } });
  }

  getNoteById(noteId: number) {}

  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDTO,
        userId,
      },
    });
    return note;
  }

  async updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = await this.prismaService.note.findUnique({
      where: { id: noteId },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to update');
    }
    return this.prismaService.note.update({
      where: { id: noteId },
      data: { ...updateNoteDTO },
    });
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: { id: noteId },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to delete');
    }
    return this.prismaService.note.delete({
      where: { id: noteId },
    });
  }
}

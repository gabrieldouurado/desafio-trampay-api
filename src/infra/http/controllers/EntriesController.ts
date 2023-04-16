import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { UploadCSVAccountingEntriesUseCase } from 'src/application/useCases/UploadCSVAccountingEntriesUseCase';

@Controller('entries')
export class EntiresController {
  constructor(
    private uploadCSVAccountingEntriesController: UploadCSVAccountingEntriesUseCase,
  ) {}

  @Post('/upload-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp',
      }),
    }),
  )
  async updateCSV(@Req() request: Request) {
    const filename = request.file.filename;

    await this.uploadCSVAccountingEntriesController.execute(filename);
  }
}

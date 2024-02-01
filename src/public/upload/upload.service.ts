import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  convert = require('heic-convert');
  fs = require('fs');

  async heicToJpeg(file: Buffer) {
    const outputBuffer = await this.convert({
      buffer: file, // the HEIC file buffer
      format: 'JPEG', // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });

    return outputBuffer as Buffer;
  }

  async upload(file: Express.Multer.File, userId: number) {
    if (!file.mimetype.startsWith('image')) {
      throw new Error('File is not an image');
    }

    let readyImage = file.buffer;

    const isHeic = file.mimetype === 'image/heic';

    if (isHeic) {
      const convertedImage = await this.heicToJpeg(file.buffer);
      readyImage = convertedImage; // Use the converted image buffer
    }

    const processedImage = await sharp(readyImage)
      .resize(1000)
      .toFormat('jpeg')
      .toBuffer();

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'find-image-uploads',
        Key: userId + Date.now() + Math.floor(Math.random() * 6) + '.jpeg',
        Body: processedImage,
      }),
    );
  }
}

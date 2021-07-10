import path from 'path';
import fs from 'fs';
import { scheduleDownloadStatusMessage } from './sendDownloadStatusLog';

class WriteLogsToFile {
  fileName: string;

  filePath: string;

  fileCount = 0;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.setFileName();
  }

  setFileName() {
    this.fileName = `coralogix_logs_${new Date()
      .toISOString()
      .replaceAll(':', '-')}`;
    this.fileCount = 0;
  }

  getFileName() {
    if (this.fileCount > 0) {
      return `${this.fileName}-${this.fileCount}.json`;
    }
    return `${this.fileName}.json`;
  }

  async writeJsonToFile(event: any, data: any) {
    const filePath = path.join(this.filePath, this.getFileName());
    const fileSize = (
      await fs.promises.stat(filePath).catch(() => ({ size: 0 }))
    ).size;

    if (fileSize === 0) {
      scheduleDownloadStatusMessage([`Writing logs to file ${filePath}...`]);
      await fs.promises
        .writeFile(filePath, JSON.stringify(data))
        .then(() => scheduleDownloadStatusMessage(['Logs saved in file!']))
        .catch(() =>
          scheduleDownloadStatusMessage(
            [`Could not write logs to file ${filePath}`],
            true
          )
        );
      return;
    }

    if (Math.floor(fileSize / (1024 * 1024)) >= 30) {
      this.fileCount += 1;
      const newFilePath = path.join(this.filePath, this.getFileName());
      scheduleDownloadStatusMessage([
        `Writing in new file ${filePath}, previous exceeded 30MB...`,
      ]);
      await fs.promises
        .writeFile(newFilePath, JSON.stringify(data))
        .then(() => scheduleDownloadStatusMessage(['Logs saved in file!']))
        .catch(() =>
          scheduleDownloadStatusMessage(
            [`Could not write logs to file ${newFilePath}`],
            true
          )
        );
      return;
    }

    const existingData = await fs.promises
      .readFile(filePath)
      .then((res) => res.toString())
      .catch(() => {
        scheduleDownloadStatusMessage(
          [`Could open file ${filePath} to append logs!`],
          true
        );
        return null;
      });

    if (!existingData) {
      return;
    }

    const jsonData = JSON.parse(existingData);
    jsonData.push(...data);

    scheduleDownloadStatusMessage([`Appending logs to file ${filePath}...`]);
    await fs.promises
      .writeFile(filePath, JSON.stringify(jsonData))
      .then(() => scheduleDownloadStatusMessage(['Logs appended to file!']))
      .catch(() =>
        scheduleDownloadStatusMessage(
          [`Could not append logs to file ${filePath}`],
          true
        )
      );
  }
}

export default WriteLogsToFile;

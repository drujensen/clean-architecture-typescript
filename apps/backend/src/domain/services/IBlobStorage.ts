export interface IBlobStorage {
  upload(fileName: string, data: Buffer): Promise<string>; // returns URL
  download(fileName: string): Promise<Buffer>;
  delete(fileName: string): Promise<void>;
}
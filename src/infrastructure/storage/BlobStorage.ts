// For Blob Storage, using Azure as example, but since not installed, just interface
// In real project, install @azure/storage-blob

export interface IBlobStorage {
  upload(fileName: string, data: Buffer): Promise<string>; // returns URL
  download(fileName: string): Promise<Buffer>;
  delete(fileName: string): Promise<void>;
}

// export class AzureBlobStorage implements IBlobStorage { ... }
// env.d.ts
interface Window {
  showSaveFilePicker: (options: {
    types: Array<{
      description: string;
      accept: { [key: string]: string[] };
    }>;
  }) => Promise<FileSystemFileHandle>;
}

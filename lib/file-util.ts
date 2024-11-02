import { UsersData } from "@/types";
import { promises as fs } from "fs";
import path from "path";

interface FileOperations<T> {
  read: () => Promise<T>;
  write: (data: T) => Promise<void>;
  update: (updateFn: (currentData: T) => T) => Promise<void>;
}

export function createJsonFileUtil<T>(fileName: string): FileOperations<T> {
  const filePath = path.join(process.cwd(), "src", "data", fileName);

  const ensureFileExists = async (defaultData: T) => {
    try {
      await fs.access(filePath);
    } catch {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
    }
  };

  return {
    async read(): Promise<T> {
      try {
        await ensureFileExists({} as T);
        const content = await fs.readFile(filePath, "utf-8");
        return JSON.parse(content);
      } catch (error) {
        console.error(`Error reading ${fileName}:`, error);
        throw error;
      }
    },

    async write(data: T): Promise<void> {
      try {
        await ensureFileExists({} as T);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(`Error writing ${fileName}:`, error);
        throw error;
      }
    },

    async update(updateFn: (currentData: T) => T): Promise<void> {
      try {
        const currentData = await this.read();
        const updatedData = updateFn(currentData);
        await this.write(updatedData);
      } catch (error) {
        console.error(`Error updating ${fileName}:`, error);
        throw error;
      }
    },
  };
}

export const getUsersFromFile = async () => {
  const usersFile = createJsonFileUtil<UsersData>("users.json");
  try {
    const data = await usersFile.read();
    return { users: data.users || [] };
  } catch (error) {
    console.error("Error reading users file:", error);
    return { users: [] };
  }
};

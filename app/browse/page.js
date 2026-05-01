import fs from 'fs/promises';
import path from 'path';
import BrowseClient from './BrowseClient';

export default async function BrowsePage() {
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const books = JSON.parse(jsonData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <BrowseClient initialBooks={books} />
    </div>
  );
}

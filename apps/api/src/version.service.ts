import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

type PackageJson = {
  version: string;
};

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(
  fs.readFileSync(packageJsonPath, 'utf8'),
) as PackageJson;

@Injectable()
export class VersionService {
  getVersion() {
    return {
      version: packageJson.version,
    };
  }
}

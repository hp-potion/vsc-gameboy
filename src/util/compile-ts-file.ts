import * as path from "path";
import * as ts from "typescript";
import * as fs from "fs";

function compileTypeScript(filePath: string): string {
  const tsCode = fs.readFileSync(filePath, "utf8");
  const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const compiledFilePath = path.join(
    path.dirname(filePath),
    path.basename(filePath, ".ts") + ".js"
  );
  fs.writeFileSync(compiledFilePath, jsCode);
  return compiledFilePath;
}

export default compileTypeScript;

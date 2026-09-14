// @vitest-environment node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { expect, it } from 'vitest';

it('accepts frontend React nodes across the shared UI and Suspense boundary', () => {
  const frontend = fileURLToPath(new URL('../', import.meta.url));
  const fixture = path.join(frontend, '__react_ui_type_contract__.tsx');
  const source = `
    import { Suspense, type ComponentProps, type ReactNode } from 'react';
    import { Banner, EmptyState, ErrorState } from '@hedgr/ui';

    declare const child: ReactNode;
    const banner: ComponentProps<typeof Banner> = { children: child };
    const empty: ComponentProps<typeof EmptyState> = { title: 'Empty', icon: child };
    const error: ComponentProps<typeof ErrorState> = { title: 'Error', icon: child };
    const suspended = <Suspense fallback={null}><Banner>{child}</Banner></Suspense>;
  `;

  const config = ts.readConfigFile(path.join(frontend, 'tsconfig.json'), ts.sys.readFile);
  expect(config.error).toBeUndefined();
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, frontend);
  expect(parsed.errors).toEqual([]);

  // Compile the actual package exports. Vitest's normal transpilation does not
  // check whether independently resolved ReactNode types are assignable.
  const options = { ...parsed.options, incremental: false, noEmit: true, types: [] };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) =>
    fileName === fixture
      ? ts.createSourceFile(fileName, source, languageVersion, true, ts.ScriptKind.TSX)
      : getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);

  const program = ts.createProgram([fixture], options, host);
  const errors = ts.getPreEmitDiagnostics(program)
    .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
    .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  expect(errors).toEqual([]);
});

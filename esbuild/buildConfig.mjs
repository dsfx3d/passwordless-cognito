import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck';

const buildConfig = {
  resolveExtensions: ['.mjs', '.js', '.ts'],
  plugins: [typecheckPlugin()],
};

export default buildConfig;

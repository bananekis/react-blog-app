declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly REACT_APP_BASE_URL: string;
        readonly REACT_APP_API_KEY: string;
      }
    }
  }
}

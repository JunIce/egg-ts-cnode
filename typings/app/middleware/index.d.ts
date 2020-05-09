// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthentication from '../../../app/middleware/authentication';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportLocals from '../../../app/middleware/locals';
import ExportNotFoundError from '../../../app/middleware/notFoundError';

declare module 'egg' {
  interface IMiddleware {
    authentication: typeof ExportAuthentication;
    errorHandler: typeof ExportErrorHandler;
    locals: typeof ExportLocals;
    notFoundError: typeof ExportNotFoundError;
  }
}

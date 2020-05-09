// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/service/Base';
import ExportHome from '../../../app/service/Home';

declare module 'egg' {
  interface IService {
    base: ExportBase;
    home: ExportHome;
  }
}

/*nedb:node自带嵌入式数据库*/
import Datastore from 'nedb';
import {StorageConfig } from './CONSTANTS';

var db = new Datastore({ filename: StorageConfig.DEFAULT_DB, autoload: true });

export default db;

'use strict';
import {Log} from './Logger.module';
import LoggerBuilder = Log.LoggerBuilder;
import Logger = Log.Logger;
/**
 * Created by becari on 28/09/2016.
 */
let logger: Logger = (new LoggerBuilder()).setSource("test").build();
logger.on();
logger.log("howdy");
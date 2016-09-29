'use strict';
/**
 * Created by becari on 28/09/2016.
 */
export module Log {
    class Constants {
        private static ERR_MISSING_SMTH: string = "Missing property";

        static DEF_SOURCE: string = "logger";

        static MES_LOGGER_ENABLED: string = "Logger enabled.";
        static MES_LOGGER_DISABLED: string = "Logger disabled.";

        static ERR_MISSING_SOURCE: string = Constants.ERR_MISSING_SMTH + " 'source'.";
        static ERR_MISSING_ENABLED_FLAG: string = Constants.ERR_MISSING_SMTH + " 'enabled'.";
        static ERR_ALREADY_ENABLED_OR_DISABLED: string = "Logger already enabled/disabled.";
    }

    class Util {
        private static getCurrentDate(): string {
            return (new Date()).toDateString();
        }
        static log(_message: string, _source?: string, _dateString?: string) {
            console.log(Util.message(_message, _source, _dateString));
        }
        static message(_message: string, _source?: string, _dateString?: string): string {
            return (_dateString || Util.getCurrentDate()) + " [" + (_source || Constants.DEF_SOURCE) + "] -> " + _message;
        }
    }

    class Errors {
        static ERR_MISSING_SOURCE: Error = Errors.create(Constants.ERR_MISSING_SOURCE);
        static ERR_MISSING_ENABLED_FLAG: Error = Errors.create(Constants.ERR_MISSING_ENABLED_FLAG);
        static ERR_ALREADY_ENABLED_OR_DISABLED: Error = Errors.create(Constants.ERR_ALREADY_ENABLED_OR_DISABLED);

        private static create(_desc: string): Error {
            return new Error(_desc);
        }
    }

    export class LoggerBuilder {
        _source: string = Constants.DEF_SOURCE;

        constructor(obj?: Logger) {
            this.source = obj && obj.source || this.source;
        }

        build(): Logger {
            var ret: Logger = new Logger();
            if(!this.source) throw Errors.ERR_MISSING_SOURCE;
            ret.source = this.source;
            return ret;
        }
        setSource(_source: string): LoggerBuilder {
            if(!_source || _source.length === 0) throw Errors.ERR_MISSING_SOURCE;
            this.source = _source;
            return this;
        }

        get source(): string {
            return this._source;
        }
        set source(_source: string) {
            this._source = _source;
        }
    }

    export class Logger {
        static _enabled: boolean = false;
        _source: string = Constants.DEF_SOURCE;

        constructor(obj?: Logger) {
            this.source = obj && obj.source || this.source;
        }

        log(_message: string) {
            if(!this.source) throw Errors.ERR_MISSING_SOURCE;
            Util.log(_message, this.source);
        }
        on() {
            Logger.on();
        }
        off() {
            Logger.off();
        }
        private static switchTo(_state: boolean) {
            if(Logger.enabled != _state) {
                var message: string = _state ?
                    Constants.MES_LOGGER_ENABLED :
                    Constants.MES_LOGGER_DISABLED;
                Util.log(message);
                Logger.enabled = _state;
            } else throw Errors.ERR_ALREADY_ENABLED_OR_DISABLED;
        }
        static on() {
            Logger.switchTo(true);
        }
        static off() {
            Logger.switchTo(false);
        }

        static get enabled(): boolean {
            return Logger._enabled;
        }
        static set enabled(_enabled: boolean) {
            if(_enabled == null) throw Errors.ERR_MISSING_ENABLED_FLAG;
            Logger._enabled = _enabled;
        }
        get source(): string {
            return this._source;
        }
        set source(_source: string) {
            if(!_source || _source.length === 0) throw Errors.ERR_MISSING_SOURCE;
            this._source = _source;
        }
    }
}
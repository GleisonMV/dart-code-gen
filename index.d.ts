declare module "dart-code-gen" {

    declare type Value = string | CallValue | MapValue

    declare interface MapValue {

        type: string,
        value: Value
    }

    declare interface CallValue {

        type: string,
        value: Value
    }

    declare interface Param {
        name: string
        type: string
        value?: Value
    }

    declare type Args = object | any;

    declare interface WriterOptions {
        tabSymbol?: string = "  "
    }

    declare class InternalClass {

        Extends(name: string): InternalClass
        Implements(name: string): InternalClass
        Function(name: string): InternalFunction
        Variable(type: string, name: string, value?: string): InternalClass
    }

    declare class InternalFunction {

        Override(): InternalFunction
        Type(name: string): InternalFunction
        Async(): InternalFunction
        Param(name: string, type: string = null): InternalFunction
        OptionalParam(params: Param[]): InternalFunction
        NamedParam(params: Param[]): InternalFunction
        Variable(type: string, name: string, value?: string): InternalFunction
        Return(value?: Value): InternalFunction
        Call(name: string, ...values: Args): InternalFunction

    }

    declare class Builder {

        Class(name: string): InternalClass
        Import(name: string, alias?: string): Builder
        Variable(type: string, name: string, value?: string): Builder
        Function(name: string): InternalFunction
        Call(name: string, ...values: Args): Builder
        CallValue(prefix: string, ...values: Args): CallValue
        MapValue(value: any): MapValue
        String(value: string): String

    }

    declare class Writer {

        constructor(builder: Builder, options)

        toString(): string
        toFile(path: string): void
    }

    declare type Builder = Builder;
    declare type Writer = Writer;

}
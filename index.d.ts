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
    type?: string
    value?: Value
}

declare type Args = object | any;

declare interface WriterOptions {
    tabSymbol?: string
}

declare class InternalClass {

    Extends(name: string): InternalClass
    Implements(name: string): InternalClass
    Function(name: string): InternalFunction
    Constructor(): InternalFunction
    Variable(type: string, name: string, value?: string): InternalClass
}

declare class InternalFunction {

    Override(): InternalFunction
    Constructor(): InternalFunction
    Type(name: string): InternalFunction
    Async(): InternalFunction
    Param(name: string, type?: string): InternalFunction
    OptionalParam(params: Param[]): InternalFunction
    NamedParam(params: Param[]): InternalFunction
    Variable(type: string, name: string, value?: string): InternalFunction
    Return(value?: Value): InternalFunction
    Call(name: string, ...values: Args): InternalFunction

}

declare module "dart-code-gen" {


    class Builder {

        Class(name: string): InternalClass
        Import(name: string, alias?: string): Builder
        Variable(type: string, name: string, value?: string): Builder
        Function(name: string): InternalFunction
        Call(name: string, ...values: Args): Builder
        CallValue(prefix: string, ...values: Args): CallValue
        MapValue(value: any): MapValue
        String(value: string): String
    
    }
    
    class Writer {

        constructor(builder: Builder, options?: WriterOptions)
    
        toString(): string
        toFile(path: string): void
    }
}
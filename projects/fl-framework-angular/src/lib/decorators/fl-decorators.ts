import { endsWithCharAppend } from '../utils/fi-utils';
/**
 * MethodDecorator
 * 遅延実行
 * @param milliseconds ミリ秒
 */
export function delayBy(milliseconds: number) {
    return function (target, key, descriptor) {

        var originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);

        };
        return descriptor;
    }
}
/**
 * ClassDecorator
 * 接続サービス名
 * @param name サービス名
 */
export function FlServiceName(name?: string) {
    return <TFunc extends Function>(target: TFunc) => {
        if (name) {
            var serviceName = endsWithCharAppend(name, 'Service');
            target.prototype['serviceName'] = serviceName;
        }
    };
};

// export function ServiceName(name:string) {
// return function (target: any) {
//     var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
//     parentTarget.serviceName = name;
//     }
// }